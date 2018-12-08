import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EntryDetailPage } from '../pages/entry-detail/entry-detail';
import { CreatePage } from '../pages/create/create';
import { TaskPage } from '../pages/task/task';
import { DayPage } from '../pages/day/day';
import { TaskDetailPage } from '../pages/task-detail/task-detail';
import { EntryDataServiceProvider } from '../providers/entry-data-service/entry-data-service';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { NavController } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { MultiPickerModule } from 'ion-multi-picker';





@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EntryDetailPage,
    CreatePage,
    TaskPage,
    TaskDetailPage,
    DayPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    MultiPickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EntryDetailPage,
    CreatePage,
    TaskPage,
    TaskDetailPage,
    DayPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EntryDataServiceProvider
  ]
})
export class AppModule {}
