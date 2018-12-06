import { Injectable } from '@angular/core';
import { Pet, Task, Day, Photo } from '../../models/entry';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Storage } from '@ionic/storage';
import { firebaseConfig } from '../../models/firefile';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';





@Injectable()
export class EntryDataServiceProvider {


  private db: any;
  private entries:Pet[] = [];
  public activeEntryID: number;
  private serviceObserver: Observer<Pet[]>;
  private clientObservable: Observable<Pet[]>;
  private nextID: number = 0;
  public tasks: Task[] = [];
  public days: Day[] = [];
  public loaded: boolean = false;

  constructor(private storage: Storage, private alertCtrl: AlertController) { 

    firebase.initializeApp(firebaseConfig);
    this.db = firebase.database();

    this.clientObservable = Observable.create(observerThatWasCreated => {
      this.serviceObserver = observerThatWasCreated;
    });

    ////////////////////////////////////////////////////////////////
    ////////            LOADING PETS
    ////////////////////////////////////////////////////////////////
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


    ////////////////////////////////////////////////////////////////
    ////////            LOADING TASKS
    ////////////////////////////////////////////////////////////////
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
       this.sortTasks();
       this.notifySubscribers(); 
      } else {
        console.log("SNAPSHOT DOESN'T EXIST IN FIREBASE")
      };
  });


    ////////////////////////////////////////////////////////////////
    ////////        GETTING UNIQUE ID FOR STORAGE
    ////////////////////////////////////////////////////////////////
    let Ref = this.db.ref('/lastID');
    Ref.on('value', snapshot => {
      if(snapshot.exists()) { 
        this.nextID = (snapshot.val().nextID)+1
     this.notifySubscribers(); }
    });



  }   //<--- HERE ENDS THE CONSTRUCTOR



// INPUT: NONE
// OUTPUT: UNIQUE ID
  private getUniqueID(): number {
    let uniqueID = this.nextID++;
    let listRef = this.db.ref('/lastID');
    listRef.set({'nextID': uniqueID});
    return uniqueID;
  }


////////////////////////////////////////////////////////////////
////////            CRUD FUNCTIONS BELOW
////////            CREATE
////////            READ
////////            UPDATE
////////            DELETE
////////            SAVE FUNCTIONS
////////            OTHER FUNCTIONS
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
////////        CREATE FUNCTIONS
////////////////////////////////////////////////////////////////


// INPUT: NEW PET ENTRY
// OUTPUT: PUSHES NEW PET TO ENTRIES LIST
public addEntry(entry:Pet) {
  entry.id = this.getUniqueID();
  entry.timestamp = new Date();
  entry.time = entry.timestamp.getTime();
  this.entries.push(entry)
  this.notifySubscribers();
  this.saveData();
  
}


// INPUT: NEW TASK
// OUTPUT: PUSHES NEW TASK TO TASK LIST
public addTask(newTask: Task) {
  newTask.id = this.getUniqueID() + 1000;
  newTask.complete = false;
  newTask.completed_date = null;
  newTask.time = null;
  this.tasks.push(newTask);
  this.sortTasks();
  this.saveData();
  }


////////////////////////////////////////////////////////////////
////////        READ FUNCTIONS
////////////////////////////////////////////////////////////////



// INPUT: NONE
// OUTPUT: CLIENTOBSERVABLE
public getObservable(): Observable<Pet[]> {
  return this.clientObservable;
}



// INPUT: NONE
// OUTPUT: RETURNS CLONE OF PET ENTRIES LIST
 public getEntries():Pet[] {  
  let entriesClone = JSON.parse(JSON.stringify(this.entries));
  return entriesClone;
}





// INPUT: NONE
// OUTPUT: RETURNS CLONE OF TASK LIST
public getTasks(): Task[] {
  let tasksClone = JSON.parse(JSON.stringify(this.tasks));
  return tasksClone;
}




// INPUT: ENTRY ID
// OUTPUT: RETURNS CLONE OF ENTRY WITH ENTRY ID
public getEntryByID(id: number): Pet {
  
  for (let e of this.entries) {
    if (e.id === id) {
      let clone = JSON.parse(JSON.stringify(e));
      return clone;
    }
  }
  return undefined;
}


// INPUT: TASK ID
// OUTPUT: RETURNS CLONE OF TASK WITH TASK ID
public getTaskByID(id: number): Task {
  for (let e of this.tasks) {
    if (e.id === id) {
      let clone = JSON.parse(JSON.stringify(e));
      return clone;
    }
  }
  return undefined;
}





// INPUT: ENTRY ID
// OUTPUT: RETURNS ENTRY WITH ENTRY ID
private findEntryByID(id: number): Pet {
  for (let e of this.entries) {
    if (e.id === id) {
      return e;
    }
  }
  return undefined;
}



// INPUT: TASK ID
// OUTPUT: RETURNS TASK WITH TASK ID
private findTaskByID(id: number): Task {
  for (let e of this.tasks) {
    if (e.id === id) {
      return e;
    }
  }
  return undefined;
}




////////////////////////////////////////////////////////////////
////////        UPDATE FUNCTIONS
////////////////////////////////////////////////////////////////


// INPUT: ENTRY ID AND NEW PET TO OVERWRITE OLD ONE
// OUTPUT: OVERWRITES OLD PET DATA WITH NEW PET DATA
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


// INPUT: NEW TASK TO OVERWRITE OLD ONE
// OUTPUT: OVERWRITES TASK DATA WITH NEW TASK INFO
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
  this.sortTasks();
  this.notifySubscribers();
  this.saveData();
}


// INPUT: TASK ID
// OUTPUT: ASSIGNS NEW COMPLETED DATE TO TASK IF USER INPUTS TASK IS COMPLETED  
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
  }




////////////////////////////////////////////////////////////////
////////        DELETE FUNCTIONS
////////////////////////////////////////////////////////////////  



// INPUT: PET ENTRY ID
// OUTPUT: SLICES PET ENTRY AND TASKS ASSOCIATED WITH PET FROM ENTRY LIST AND DB
public removeEntry(id: number): void {
  let listRef = this.db.ref('/allEntry/pets');
  for (let i=0; i < this.entries.length; i++) {
    let iID = this.entries[i].id;
    if (iID === id) {
      this.entries.splice(i, 1);
      listRef.child(iID).remove()
      break;
    }
  }
  let taskRef = this.db.ref('/allEntry/tasks');
  for (let ix = this.tasks.length-1; ix >= 0; --ix) {
    let ts = this.tasks
    if (ts[ix].pet_id == id) {
      let taskID = ts[ix].id
      ts.splice(ix, 1);
      taskRef.child(taskID).remove();
    }
  }
  this.notifySubscribers();
  this.saveData();

}




// INPUT TASK ID
// OUTPUT REMOVES TASK FROM LIST AND DB
public removeTask(id: number): void {
  let taskRef = this.db.ref('/allEntry/tasks');
  for (let i=0; i < this.tasks.length; i++) {
    let iID = this.tasks[i].id;
    if (iID === id) {
      this.tasks.splice(i, 1);
      taskRef.child(iID).remove()
      break;
    }
  }
}



////////////////////////////////////////////////////////////////
////////        SAVE DATA FUNCTIONS
////////////////////////////////////////////////////////////////  



// INPUT: NONE
// OUTPUT: TELLS OBSERVER DATA CHANGED
private notifySubscribers(): void {
  this.serviceObserver.next(undefined);
}


// INPUT: NONE
// OUTPUT: CALLS FOLLOWING SAVE FUNCTIONS
private saveData(): void {
  this.savePets(); this.saveTasks(); this.saveDays();
}


// INPUT: NONE
// OUTPUT: SAVES TASKS TO DB
private saveTasks(): void {
  let listRef2 = this.db.ref('/allEntry/tasks');
  for (let task of this.tasks) {listRef2.child(task.id).set(task);}
}


// INPUT: NONE
// OUTPUT: SAVES PETS TO DB
private savePets(): void {
  let listRef = this.db.ref('/allEntry/pets');
  for (let entry of this.entries) {listRef.child(entry.id).set(entry);}
}

// INPUT: NONE
// OUTPUT: SAVES DAYS TO DB
private saveDays(): void {
  let listRef3 = this.db.ref('/allEntry/days');
  for (let day of this.days) {listRef3.child(day.id).set(day);}
}








////////////////////////////////////////////////////////////////
////////        CREATE PAGE SPECIFIC FUNCTIONS
////////////////////////////////////////////////////////////////  





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
      refresh: 0,
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



////////////////////////////////////////////////////////////////
////////        TASK PAGE VIEW FUNCTIONS
////////
////////        this exists because I can't get the constructor
////////        to work with two observers/observables on both
////////        pets and tasks. We don't technically need an 
////////        observable to get it to work since we can alter
////////        the view here instead.
////////////////////////////////////////////////////////////////  

public sortTasks(){

    this.tasks.sort((a: Task, b: Task) => {
      return parseInt(a.deadline) - parseInt(b.deadline)
    });
}


// INPUT SCHEDULE (I.E DAILY, WEEKLY, ETC) & A LIST OF PETS TO CHECK IDS
// OUTPUT IF SCHEDULE EXISTS ON PETIDS RETURNS TRUE, OTHERWISE FALSE
public verifyScheduleExists(schedule, petlist): boolean{
  let taskcheck = [];
  for (let p of petlist){
    taskcheck.push(p.id)
  }
  for (let task of this.tasks){
    // console.log("WHY ARE YOU NOT SORTING", taskcheck.indexOf(task.pet_id) != -1)
    if (task.schedule == schedule && taskcheck.indexOf(task.pet_id) != -1 ) {return true;}
  }
  return false
}


public getTaskListForPet(petID): Task[] {
  let ListToReturn = []
  for (let task of this.tasks){
    if (task.pet_id == petID //&& task.schedule == "Daily"){
      ){ ListToReturn.push(task)
    }
  }
  return ListToReturn
}


public listCompletedTasks(petID): any[] {
  let completedTasks = [];
  let taskList = this.getTaskListForPet(petID);
  for (let task of taskList ) {
    if (task.complete == true //&& task.schedule == 'Daily') {
      ) { completedTasks.push(task)

    }
  }
 return completedTasks
}




/*!!!!Doesnt loop properly*/
public refreshSchedule() {
  for (let task of this.tasks) {
    if (task.schedule === 'Daily') {
      task.refresh = 5;
      setInterval(() => {
        task.complete = false;
    }, task.refresh);
    }
    else if (task.schedule === 'Weekly') {
      task.refresh = 10;
      setInterval(() => {
        task.complete = false;
    }, task.refresh);


    }
    else {
      task.refresh = 15; 
      setInterval(() => {
        task.complete = false;
    }, task.refresh);
    }
    console.log(task.refresh);
  }
}

} // <<----- HERE ENDS THE CLASS EntryDataServiceProvider