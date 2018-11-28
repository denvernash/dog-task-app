import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Entry } from '../../models/entry';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service';




@IonicPage()
@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html',
})
export class TaskDetailPage {

  private entry: Entry;
  private createDate: Date;
  


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public entryDataService: EntryDataServiceProvider) {

    let entryID = this.navParams.get("entryID");
    let entry = this.entryDataService.getEntryByID(entryID);

  if (entryID === undefined) {
    this.entry = new Entry();
    this.entry.title = "";
    this.entry.text = "";
    this.entry.id = -1; // placeholder for 'temporary' entry
  } else {
  this.entry = this.entryDataService.getEntryByID(entryID);
  if (typeof this.entry.timestamp === 'string') {
    this.createDate = new Date(this.entry.timestamp);
  } else { this.createDate = this.entry.timestamp }
  
}
    console.log("retrieved entry:", entry);

  }

private saveEntry() {
  if (this.entry.id === -1) { 
    this.entryDataService.addEntry(this.entry);
  } else {
    this.entryDataService.updateEntry(this.entry.id, this.entry);
  }
  this.navCtrl.pop();
}

public cancelEntry() {
  this.navCtrl.pop();
}


 

}