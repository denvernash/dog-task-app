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

 
  private task: Task;
  petID: number;
  petlist: Pet[] =[]
  edit_check: boolean;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public entryDataService: EntryDataServiceProvider) {

    this.petlist = entryDataService.getEntries();
    let pet_id = this.navParams.get("petID");
    let taskID = this.navParams.get('taskID')
    if (pet_id === undefined) {
      this.petID = entryDataService.activeEntryID;
      this.edit_check = false;
      console.log(this.edit_check)
      
    }
    else {
    this.petID = pet_id
    this.edit_check = true;
    
    console.log("here's what i've got for my id", taskID)
    }
  


  if (taskID === undefined) {
    this.task = new Task();
    this.task.title = "";
    this.task.notes = "";
    this.task.id = -1; // placeholder for 'temporary' entry
    this.task.pet_id = this.petID;
    console.log('giving taskid -1')
    this.task.deadline = ''
    this.task.schedule = ''
  } else {
    console.log("Here's my id's", taskID, pet_id)
    
    this.task = this.entryDataService.getTaskByID(taskID);
  
  
  
}


  }

private saveEntry() {
  
  if (this.task.id === -1) { 
    this.entryDataService.addTask(this.task);

    
  } else {
    this.entryDataService.updateTask(this.task);
 
  }
  this.navCtrl.pop();
}

public cancelEntry() {
  this.navCtrl.pop();
}


 

}
