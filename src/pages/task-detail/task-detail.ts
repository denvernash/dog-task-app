import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  selectOptions: object;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public entryDataService: EntryDataServiceProvider,
    public alertCtrl: AlertController) {

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
    this.task.deadline = "08:00"
    this.task.schedule = 'Daily'
  } else {
    console.log("Here's my id's", taskID, pet_id)
    
    this.task = this.entryDataService.getTaskByID(taskID);
  
  
  
}






  } /// <----- CONSTRUCTOR ENDS HERE


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

private deleteEntry(id: number) {
  this.entryDataService.removeTask(id)
    this.navCtrl.pop()
  }

public ConfirmDelete(id): any {
  let alert = this.alertCtrl.create({
    title: 'Confirm Task Deletion',
    message: 'Do you want to delete this Task?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('I said no')
          
        }
      },
      {
        text: 'Delete',
        handler: () => {
          console.log("I said yes")
          this.deleteEntry(id)
        }
      }
    ]
  });
  alert.present();
}

public hidden(id): string {
  if (id === -1)
  return "hidden"
}







 

}
