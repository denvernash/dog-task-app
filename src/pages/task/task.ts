import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Entry, Task } from '../../models/entry';
import { EntryDetailPage } from '../entry-detail/entry-detail';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service';
import { TaskDetailPage } from '../task-detail/task-detail';


@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {

  public tasklist: Task[];
  private entry: Entry;
  private createDate: Date;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public entryDataService: EntryDataServiceProvider) {

      console.log('Constructor')
      let entryID = this.navParams.get("entryID");
      let entry = this.entryDataService.getEntryByID(entryID);
      this.entryDataService.activeEntry = entry;
      console.log("Here's the id in the constructor for the entry", entryID)
  
    if (entryID === undefined) {
      this.entry = new Entry();
      this.entry.title = "";
      this.entry.text = "";
      this.entry.id = -1; // placeholder for 'temporary' entry
      this.entry.tasks = [];
      
     
    } else {
    this.entry = this.entryDataService.getEntryByID(entryID);
    if (typeof this.entry.timestamp === 'string') {
      this.createDate = new Date(this.entry.timestamp);
    } else { this.createDate = this.entry.timestamp }
  }
  

  }

ngOnInit() {
// this.tasklist = this.entry.tasks

this.getFakeTasks()
console.log('nginited')

}

private addEntry(entryID) {
  console.log("passed to add entry", entryID)
this.navCtrl.push(TaskDetailPage, {"entryID": entryID});
}

private getFakeTasks() {
  let it1 = new Task();
  it1.title = "FAKE TASK 1";
  it1.id = 100
  let it2 = new Task();
  it2.title = "FAKE TASK 2";
  it2.id = 200
  let it3 = new Task();
  it3.title = "FAKE TASK 3";
  it3.id = 300
  let fakelist = [it1, it2, it3];
  this.tasklist = fakelist;
}

private editTask(taskID: number, entryID: number) {
console.log("editing entry ", entryID);
this.navCtrl.push(TaskDetailPage, {"entryID": entryID, "taskID":taskID});
}

private deleteEntry(entryID: number) {
this.entryDataService.removeEntry(entryID)
console.log('deleting entry', entryID)
}



}
