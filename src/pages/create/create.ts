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
  
  addChecklist(data): void {

    let prompt= this.alertCtrl.create({
      title: 'New Checklist',
      message: 'Enter the name of your new checklist below:',
      inputs: [
        {
          type: 'text',
          name: 'name'
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


  renameChecklist(checklist): void {

    let prompt= this.alertCtrl.create({
      title: 'Rename Checklist',
      message: 'Enter the new name of this checklist below:',
      inputs: [
        {
          type: 'text',
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.dataService.renameChecklist(checklist, data);

          }
        }
      ]
    });
    prompt.present();
   

  }

  removeChecklist(checklist): void{

    this.dataService.removeChecklist(checklist);

  }
}

