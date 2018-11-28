import { Injectable } from '@angular/core';
import { Entry } from '../../models/entry';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Storage } from '@ionic/storage';
import { firebaseConfig } from '../../models/firefile';
import firebase from 'firebase';
import { Checklist } from '../../models/checklist';



@Injectable()
export class EntryDataServiceProvider {


  private db: any;
  private entries:Entry[] = [];
  private serviceObserver: Observer<Entry[]>;
  private clientObservable: Observable<Entry[]>;
  private nextID: number = 0;
  public checklists: Checklist[] = [];
  public loaded: boolean = false;

  constructor(private storage: Storage) { 

    firebase.initializeApp(firebaseConfig);
    this.db = firebase.database();

    this.clientObservable = Observable.create(observerThatWasCreated => {
      this.serviceObserver = observerThatWasCreated;
    });

    let dataRef = this.db.ref('/allEntry');
    dataRef.on('value', snapshot => {
    this.entries = []; //start with a blank list
    snapshot.forEach(childSnapshot => {
      let newbie = new Entry;
      newbie.id = childSnapshot.val().id;
      newbie.title = childSnapshot.val().title;
      newbie.text = childSnapshot.val().text;
      newbie.image = childSnapshot.val().image;
      newbie.time = childSnapshot.val().time;
      newbie.timestamp = new Date(newbie.time);
    this.entries.push(newbie);
    
     });
     this.notifySubscribers(); 
    });

    let Ref = this.db.ref('/lastID');
    Ref.on('value', snapshot => {
      if(snapshot.exists()) { 
        this.nextID = (snapshot.val().nextID)+1
    //  console.log("HERES THE ID FROM STORAGE", this.nextID)
     this.notifySubscribers(); }
    });



  }

  private getUniqueID(): number {
    let uniqueID = this.nextID++;
    let listRef = this.db.ref('/lastID');
    listRef.set({'nextID': uniqueID});
    return uniqueID;
  }


public addEntry(entry:Entry) {
  entry.id = this.getUniqueID();
  // console.log("HERES YOUR ID", entry.id)
  entry.timestamp = new Date();
  entry.time = entry.timestamp.getTime();
  this.entries.push(entry)
  this.notifySubscribers();
  this.saveData();
  
}

  
 public getEntries():Entry[] {  
  let entriesClone = JSON.parse(JSON.stringify(this.entries));
  return entriesClone;
}

public getObservable(): Observable<Entry[]> {
  return this.clientObservable;
}


private notifySubscribers(): void {
  this.serviceObserver.next(undefined);
}

private saveData(): void {
  
  let listRef = this.db.ref('/allEntry');
  for (let entry of this.entries) {
  listRef.child(entry.id).set(entry);
}
}



public getEntryByID(id: number): Entry {
  for (let e of this.entries) {
    if (e.id === id) {
      let clone = JSON.parse(JSON.stringify(e));
      return clone;
    }
  }
  return undefined;
}

public updateEntry(id: number, newEntry: Entry): void {
  let entryToUpdate: Entry = this.findEntryByID(id);
  entryToUpdate.title = newEntry.title;
  entryToUpdate.text = newEntry.text;
  entryToUpdate.timestamp = new Date();
  entryToUpdate.time = entryToUpdate.timestamp.getTime();
  entryToUpdate.image = newEntry.image;

  this.notifySubscribers();
  this.saveData();
}

private findEntryByID(id: number): Entry {
  for (let e of this.entries) {
    if (e.id === id) {
      return e;
    }
  }
  return undefined;
}

public removeEntry(id: number): void {
  let listRef = this.db.ref('/allEntry');
  for (let i=0; i < this.entries.length; i++) {
    console.log(i)
    let iID = this.entries[i].id;
    if (iID === id) {
      this.entries.splice(i, 1);
      listRef.child(iID).remove()
      break;
    }
  }
  this.notifySubscribers();
  this.saveData();

}


  load(): Promise<boolean> {

    return new Promise((resolve) => {

      this.storage.get('checklists').then((checklists) => {

        if(checklists != null){
          this.checklists = checklists;
        }

        this.loaded = true;
        resolve(true);

      });

    });

  }

  createChecklist(data): void {

    this.checklists.push({
      id: this.generateSlug(data.name),
      title: data.name,
      items: []
    });

    this.save();

  }

  renameChecklist(checklist, data): void {

    let index = this.checklists.indexOf(checklist);

    if(index > -1){
      this.checklists[index].title = data.name;
      this.save();
    }

  }

  removeChecklist(checklist): void {

    let index = this.checklists.indexOf(checklist);

    if(index > -1){
      this.checklists.splice(index, 1);
      this.save();
    }

  }
  
  getChecklist(id): Checklist {
    return this.checklists.find(checklist => checklist.id === id);
  }

  addItem(checklistId, data): void {

    this.getChecklist(checklistId).items.push({
      title: data.name,
      checked: false
    });

    this.save();

  }

  removeItem(checklist, item): void {

    let index = checklist.items.indexOf(item);

    if(index > -1){
      checklist.items.splice(index, 1);
      this.save()
    }    

  }

  renameItem(item, data): void {

    item.title = data.name;
    this.save();

  }

  toggleItem(item): void {
    item.checked = !item.checked;
    this.save();
  }


  save(): void {
    this.storage.set('checklists', this.checklists);
  }

  //Understand the purpose of this but not the implementation.
  generateSlug(title): string {

    let slug = title.toLowerCase().replace(/\s+/g, '-');

    let exists = this.checklists.filter((checklist) => {
      return checklist.id.substring(0, slug.length) === slug;
    });

    if(exists.length > 0){
      slug = slug + exists.length.toString();
    }

    return slug;


}}


