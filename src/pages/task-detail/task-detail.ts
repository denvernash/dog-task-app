import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pet, Task } from '../../models/entry';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service';




@IonicPage()
@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html',
})
export class TaskDetailPage {

  private entry: Pet;
  private task: Task;
  


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public entryDataService: EntryDataServiceProvider) {

    let petID = this.navParams.get("entryID");
    let taskID = this.navParams.get('taskID')
    console.log("here's what i've got for my id", taskID)
    this.entry = this.entryDataService.getEntryByID(petID);
  


  if (taskID === undefined) {
    this.task = new Task();
    this.task.title = "";
    this.task.notes = "";
    this.task.id = -1; // placeholder for 'temporary' entry
    console.log('giving taskid -1')
    this.task.deadline = ''
    this.task.schedule = ''
  } else {
    console.log("Here's my id's", taskID, petID)
    // this.task = this.entryDataService.getTaskByID(taskID);
  
  
  
}


  }

private saveEntry() {
  
  if (this.task.id === -1) { 
    this.entryDataService.addTask(this.entry.id, this.task);
  } else {
    // this.entryDataService.updateEntry(this.entry.id, this.entry);
    console.log("updating entry")
  }
  this.navCtrl.pop();
}

public cancelEntry() {
  this.navCtrl.pop();
}


 

}
