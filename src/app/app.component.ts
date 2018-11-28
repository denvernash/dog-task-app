import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { EntryDetailPage } from '../pages/entry-detail/entry-detail';
import { CreatePage } from '../pages/create/create';
import { TaskPage } from '../pages/task/task'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: NavController
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
    
  }

  public Home() {
    this.nav.setRoot(HomePage)

  }
  public Detail() {
    this.nav.setRoot(EntryDetailPage)
  }

  public Create() {
    this.nav.setRoot(CreatePage)
  }

  public Tasking() {
    console.log("THis is a function")
    this.nav.setRoot(TaskPage)
  }

}

