import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pet, Task, Day } from '../../models/entry';
import { EntryDetailPage } from '../entry-detail/entry-detail';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service';
import { TaskDetailPage } from '../task-detail/task-detail';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the DayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-day',
  templateUrl: 'day.html',
})
export class DayPage {
  public today:  Date;
  public shownDay: string;
  public options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };




  constructor(public navCtrl: NavController, public navParams: NavParams, public entryDataService: EntryDataServiceProvider,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DayPage');
    this.today = new Date();
    this.shownDay = this.today.toLocaleDateString("en-US", this.options)
  }

datetoID() {

}

  

}
