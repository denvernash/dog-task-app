import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service';



@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public dataService: EntryDataServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
  }
  
  addChecklistItem(data): void {

    let prompt= this.alertCtrl.create({
      title: 'New Checklist Item',
      message: 'Enter your new checklist item name, frequency, and deadline below:',
      inputs: [
        {
          type: 'text',
          name: 'title',
          placeholder: 'Title'
        },
        {
          type: 'text',
          name: 'schedule',
          placeholder: 'Schedule' /* need to constrain options */
        },
        {
          type: 'text',
          name: 'deadline',
          placeholder: 'Deadline' /* need to constrain options */
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.dataService.createChecklist(data);
          }

        }
      ]
    });
    prompt.present();

  }


  editChecklistItem(task): void {

    let prompt= this.alertCtrl.create({
      title: 'Edit Checklist',
      message: 'Edit this however you want',
      inputs: [
        {
          type: 'text',
          name: 'schedule'
        },
        {
          type: 'text',
          name: 'deadline'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.dataService.renameChecklist(task, data);

          }
        }
      ]
    });
    prompt.present();
   

  }

  removeChecklistItem(task): void{

    this.dataService.removeChecklist(task);

  }
}

