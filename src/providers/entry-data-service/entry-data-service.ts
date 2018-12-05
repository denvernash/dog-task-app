import { Injectable } from '@angular/core';
import { Pet, Task, Day, Photo } from '../../models/entry';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Storage } from '@ionic/storage';
import { firebaseConfig } from '../../models/firefile';
import firebase from 'firebase';




@Injectable()
export class EntryDataServiceProvider {


  private db: any;
  private entries:Pet[] = [];
  public activeEntryID: number;
  private PetserviceObserver: Observer<Pet[]>;
  private PetclientObservable: Observable<Pet[]>;
  private TaskserviceObserver: Observer<Task[]>;
  private TaskclientObservable: Observable<Task[]>;
  private nextID: number = 0;
  public tasks: Task[] = [];
  public days: Day[] = [];
  public loaded: boolean = false;

  constructor(private storage: Storage) { 

    firebase.initializeApp(firebaseConfig);
    this.db = firebase.database();

    this.PetclientObservable = Observable.create(observerThatWasCreated => {
      this.PetserviceObserver = observerThatWasCreated;
    });
    this.TaskclientObservable = Observable.create(createdObserver => {
      this.TaskserviceObserver = createdObserver;
    });

    // loading pets
    let dataRef = this.db.ref('/allEntry/pets');
    dataRef.on('value', snapshot => {
    this.entries = []; //start with a blank list
    snapshot.forEach(childSnapshot => {
      let newbie = new Pet;
      newbie.id = childSnapshot.val().id;
      newbie.title = childSnapshot.val().title;
      newbie.text = childSnapshot.val().text;
      newbie.image = childSnapshot.val().image;
      newbie.time = childSnapshot.val().time;
      newbie.timestamp = new Date(newbie.time);
      this.activeEntryID = newbie.id;
      this.entries.push(newbie);
    
     });
     this.notifySubscribers(); 
    });


    // loading tasks
    let taskRef = this.db.ref('/allEntry/tasks')
    taskRef.on('value', snapshot => {
      this.tasks = [];
    if(snapshot.exists()) { 
      snapshot.forEach(childSnapshot => {
        let newbie = new Task;
        newbie.id = childSnapshot.val().id;
        newbie.pet_id = childSnapshot.val().pet_id;
        newbie.title = childSnapshot.val().title;
        newbie.notes = childSnapshot.val().notes;
        newbie.deadline = childSnapshot.val().deadline;
        newbie.schedule = childSnapshot.val().schedule;
        newbie.complete = childSnapshot.val().complete;
        if (newbie.complete) {
          console.log(".complete true, getting time")
        newbie.time = childSnapshot.val().time;
        newbie.completed_date = new Date(newbie.time);
        } else {
        console.log('assigning time to null')
        console.log(newbie)
        newbie.time = null;
        newbie.completed_date = null;
        
        }
        this.tasks.push(newbie);

      
       });
       this.notifySubscribers(); 
      } else {
        console.log("DOESN'T EXIST")
      };
  });


    // geting Unique ID
    let Ref = this.db.ref('/lastID');
    Ref.on('value', snapshot => {
      if(snapshot.exists()) { 
        this.nextID = (snapshot.val().nextID)+1
     this.notifySubscribers(); }
    });



  }





  private getUniqueID(): number {
    let uniqueID = this.nextID++;
    let listRef = this.db.ref('/lastID');
    listRef.set({'nextID': uniqueID});
    return uniqueID;
  }


public addEntry(entry:Pet) {
  entry.id = this.getUniqueID();
  entry.timestamp = new Date();
  entry.time = entry.timestamp.getTime();
  this.entries.push(entry)
  this.notifySubscribers();
  this.saveData();
  
}

public updateTaskTime(id) {
let task = this.findTaskByID(id);
  if (task.complete) {
    console.log("THIS IS TRUE, ASSIGNING NEW DATE")
    task.completed_date = new Date();
    task.time = task.completed_date.getTime();
  }
  console.log(task.time)
  this.notifySubscribers();
  console.log(task.time)
  console.log("THIS IS WHERE IT BREAKS")
  this.saveData();
  console.log("DID IT DELETE THE TIME", task.time)
}



public addTask(newTask: Task) {
  newTask.id = this.getUniqueID() + 1000;
  newTask.complete = false;
  newTask.completed_date = null;
  newTask.time = null;
  this.tasks.push(newTask);
  this.notifySubscribers;
  this.saveData();
  }
  
 public getEntries():Pet[] {  
  let entriesClone = JSON.parse(JSON.stringify(this.entries));
  return entriesClone;
}
public getTasks(): Task[] {
  let tasksClone = JSON.parse(JSON.stringify(this.tasks));
  return tasksClone;
}

public getObservable(): Observable<Pet[]> {
  return this.PetclientObservable;
}


private notifySubscribers(): void {
  this.PetserviceObserver.next(undefined);
}
private notifyAgain(): void {
  this.TaskserviceObserver.next(undefined);
}

private saveData(): void {
  
  // saving pets
  let listRef = this.db.ref('/allEntry/pets');
  for (let entry of this.entries) {
  listRef.child(entry.id).set(entry);
}
// saving tasks
let listRef2 = this.db.ref('/allEntry/tasks');
  for (let task of this.tasks) {
  console.log("did it delete the time?", task.id, task.time)
  listRef2.child(task.id).set(task);
  }

// saving days
let listRef3 = this.db.ref('/allEntry/days');
for (let day of this.days) {
listRef3.child(day.id).set(day);
  }

}




public getEntryByID(id: number): Pet {
  for (let e of this.entries) {
    if (e.id === id) {
      let clone = JSON.parse(JSON.stringify(e));
      return clone;
    }
  }
  return undefined;
}

public getTaskByID(id: number): Task {
  for (let e of this.tasks) {
    if (e.id === id) {
      let clone = JSON.parse(JSON.stringify(e));
      return clone;
    }
  }
  return undefined;
}

public updateEntry(id: number, newEntry: Pet): void {
  let entryToUpdate: Pet = this.findEntryByID(id);
  console.log(id, newEntry.title)
  entryToUpdate.title = newEntry.title;
  entryToUpdate.text = newEntry.text;
  entryToUpdate.timestamp = new Date();
  entryToUpdate.time = entryToUpdate.timestamp.getTime();
  entryToUpdate.image = newEntry.image;

  this.notifySubscribers();
  this.saveData();
}

public updateTask(newTask: Task): void {
  let taskToUpdate: Task = this.findTaskByID(newTask.id)
  taskToUpdate.title = newTask.title;
  taskToUpdate.notes = newTask.notes;
  taskToUpdate.schedule = newTask.schedule;
  taskToUpdate.deadline = newTask.deadline;
  taskToUpdate.complete = newTask.complete;
  taskToUpdate.completed_date = newTask.completed_date;
  taskToUpdate.time = newTask.time;
  console.log(newTask)
  
  this.notifySubscribers();
  this.saveData();
}



private findEntryByID(id: number): Pet {
  for (let e of this.entries) {
    if (e.id === id) {
      return e;
    }
  }
  return undefined;
}

private findTaskByID(id: number): Task {
  for (let e of this.tasks) {
    if (e.id === id) {
      return e;
    }
  }
  return undefined;
}


public removeEntry(id: number): void {
  let listRef = this.db.ref('/allEntry/pets');
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

      this.storage.get('tasks').then((tasks) => {

        if(tasks != null){
          this.tasks = tasks;
        }

        this.loaded = true;
        resolve(true);

      });

    });

  }

  createChecklist(data): void {

      this.tasks.push({
      id: this.getUniqueID() + 1000,
      pet_id: data.pet_id,
      title: data.title,
      notes: '',
      deadline: data.deadline,
      schedule: data.schedule,
      complete: false,
      completed_date: null,
      time: null
    });
    this.notifySubscribers();
    this.save();

  }

  renameChecklist(task, data): void {

    let index = this.tasks.indexOf(task);

    if(index > -1){
      this.tasks[index].title = data.name;
      this.save();
    }

  }

  removeChecklist(task): void {

    let index = this.tasks.indexOf(task);

    if(index > -1){
      this.tasks.splice(index, 1);
      this.save();
    }

  }
  
  getChecklist(id): Task {
    return this.tasks.find(task => task.id === id);
  }


  save(): void {
    this.storage.set('tasks', this.tasks);
  }

  //Understand the purpose of this but not the implementation.
  generateSlug(title): string {

    let slug = 'slug';

    return slug;


}






}


