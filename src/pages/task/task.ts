import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pet, Task } from '../../models/entry';
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
  private entry: Pet;
  private createDate: Date;



  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public entryDataService: EntryDataServiceProvider) {


      
      // this.tasklist = entryDataService.getTasks();

      console.log('Constructor')
      let petID = this.navParams.get("petID");
      
      
      console.log("Here's the id in the constructor for the entry", petID)
  
    if (petID === undefined) {
      this.entry = new Pet();
      this.entry.title = "";
      this.entry.text = "";
      this.entry.id = -1; // placeholder for 'temporary' entry
      
      
     
    } else {

    this.entry = this.entryDataService.getEntryByID(petID);
    this.entryDataService.activeEntryID = this.entry.id;
    if (typeof this.entry.timestamp === 'string') {
      this.createDate = new Date(this.entry.timestamp);
    } else { this.createDate = this.entry.timestamp }
  }
  

  }

ngOnInit() {
console.log(this.entryDataService.tasks)
}


private addEntry() {
  if (this.entry.id != -1) {
this.navCtrl.push(TaskDetailPage, {'petID': this.entry.id});
}
else {
  this.navCtrl.push(TaskDetailPage)
}
}



private editTask(taskID: number, petID: number) {
console.log("editing entry ", petID);
this.navCtrl.push(TaskDetailPage, {"taskID":taskID, 'petID': petID});
}

private deleteEntry(petID: number) {
this.entryDataService.removeEntry(petID)
console.log('deleting entry', petID)
}


private toggleComplete(id) {
  this.entryDataService.updateTaskTime(id);
}


createNewDate(string_date){
let g = new Date ()
}


}
