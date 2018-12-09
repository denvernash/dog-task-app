import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Pet, Task } from '../../models/entry';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service';
import { MultiPickerModule } from 'ion-multi-picker';





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
  daysOfWeek: any[];
  daysOfMonth: any[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public entryDataService: EntryDataServiceProvider,
    public alertCtrl: AlertController,
    public picker: MultiPickerModule
    ) {

      this.daysOfWeek = [
        {
          name: 'Days',
          options: [
            { text: 'Sunday', value: '0' },
            { text: 'Monday', value: '1' },
            { text: 'Tuesday', value: '2' },
            { text: 'Wednesday', value: '3'},
            { text: 'Thursday', value: '4' },
            { text: 'Friday', value: '5' },
            { text: 'Saturday', value: '6' }
          ]
        },

        
        this.daysOfMonth = [
          {
            name: 'Days',
            options: [
              { text: '1', value: '1' },
              { text: '2', value: '2' },
              { text: '3', value: '3' },
              { text: '4', value: '4' },
              { text: '5', value: '5' },
              { text: '6', value: '6' },
              { text: '7', value: '7' },
              { text: '8', value: '8' },
              { text: '9', value: '9' },
              { text: '10', value: '10' },
              { text: '11', value: '11' },
              { text: '12', value: '12' },
              { text: '13', value: '13' },
              { text: '14', value: '14' },
              { text: '15', value: '15' },
              { text: '16', value: '16' },
              { text: '17', value: '17' },
              { text: '18', value: '18' },
              { text: '19', value: '19' },
              { text: '20', value: '20' },
              { text: '21', value: '21' },
              { text: '22', value: '22' },
              { text: '23', value: '23' },
              { text: '24', value: '24' },
              { text: '25', value: '25' },
              { text: '26', value: '26' },
              { text: '27', value: '27' },
              { text: '28', value: '28' },
              { text: '29', value: '29' },
              { text: '30', value: '30' },
              { text: '31', value: '31' }
            ]
          }]
      ];

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
    this.task.deadline = "08:00";
    this.task.schedule = 'Daily';
    this.task.dayNum = 0
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
