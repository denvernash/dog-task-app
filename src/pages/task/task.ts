import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Entry } from '../../models/entry';
import { EntryDetailPage } from '../entry-detail/entry-detail';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service';



@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {

  public entries: Entry[] = [];


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public entryDataService: EntryDataServiceProvider) {
  console.log('this ran')
  this.entryDataService.getObservable().subscribe(update => {
    this.entries = entryDataService.getEntries();


    for (let e of this.entries) {
      if (typeof e.timestamp === 'string') {
      
        e.timestamp = new Date(e.timestamp);
      }
    }

  this.entries.sort((a: Entry, b: Entry) => {
    return a.timestamp.getTime() - b.timestamp.getTime()
  }).reverse();
  console.log(this.entries);
});

  }

ngOnInit() {
this.entries = this.entryDataService.getEntries();
}

private addEntry() {
this.navCtrl.push(EntryDetailPage);
}


private editEntry(entryID: number) {
console.log("editing entry ", entryID);
this.navCtrl.push(EntryDetailPage, {"entryID": entryID});
}

private deleteEntry(entryID: number) {
this.entryDataService.removeEntry(entryID)
console.log('deleting entry', entryID)
}





  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskPage');
  }

}
