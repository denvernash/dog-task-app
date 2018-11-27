webpackJsonp([1],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntryDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_entry__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_entry_data_service_entry_data_service__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(160);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PLACEHOLDER_IMAGE = "/assets/imgs/placeholder.png";
var SPINNER_IMAGE = "/assets/imgs/spinner.gif";
var EntryDetailPage = /** @class */ (function () {
    function EntryDetailPage(navCtrl, navParams, entryDataService, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.entryDataService = entryDataService;
        this.camera = camera;
        this.image = PLACEHOLDER_IMAGE;
        var entryID = this.navParams.get("entryID");
        var entry = this.entryDataService.getEntryByID(entryID);
        if (entryID === undefined) {
            this.entry = new __WEBPACK_IMPORTED_MODULE_2__models_entry__["a" /* Entry */]();
            this.entry.title = "";
            this.entry.text = "";
            this.entry.id = -1; // placeholder for 'temporary' entry
            this.entry.image = PLACEHOLDER_IMAGE;
        }
        else {
            this.entry = this.entryDataService.getEntryByID(entryID);
            if (typeof this.entry.timestamp === 'string') {
                this.createDate = new Date(this.entry.timestamp);
            }
            else {
                this.createDate = this.entry.timestamp;
            }
        }
        console.log("retrieved entry:", entry);
    }
    EntryDetailPage.prototype.saveEntry = function () {
        if (this.entry.id === -1) {
            this.entryDataService.addEntry(this.entry);
        }
        else {
            this.entryDataService.updateEntry(this.entry.id, this.entry);
        }
        this.navCtrl.pop();
    };
    EntryDetailPage.prototype.cancelEntry = function () {
        this.navCtrl.pop();
    };
    EntryDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EntryDetailPage');
    };
    EntryDetailPage.prototype.takePic = function () {
        var _this = this;
        var img = this.entry.image;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            if (imageData) {
                _this.entry.image = 'data:image/jpeg;base64,' + imageData;
            }
            else {
                _this.entry.image = img;
            }
        }, function (err) {
            _this.entry.image = img;
        });
        this.entry.image = SPINNER_IMAGE;
    };
    EntryDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-entry-detail',template:/*ion-inline-start:"/Users/kyliewojciechowski/Desktop/SI669/proj2/src/pages/entry-detail/entry-detail.html"*/'<ion-header>\n  <ion-navbar><ion-title>Edit Diary Entry</ion-title></ion-navbar>\n</ion-header>\n<ion-content padding>\n  <ion-list no-lines>\n    <ion-item color="secondary"><ion-label>Entry title:</ion-label></ion-item>\n    <ion-item><ion-input type="text" placeholder="New Entry" [(ngModel)]="entry.title"></ion-input></ion-item>\n\n    <ion-item color="secondary"><ion-label>Photo</ion-label></ion-item>\n    <ion-item><img  [src]="entry.image" />\n    </ion-item>\n    <button ion-button (click)="takePic()">Take Photo</button>\n\n    \n    <ion-item  color="secondary"><ion-label>Thoughts and experiences: </ion-label></ion-item>\n    <ion-item><ion-textarea placeholder="Today I ..." [(ngModel)]="entry.text"></ion-textarea></ion-item>\n  </ion-list>\n\n  <ion-list>\n    <ion-item>\n      <button ion-button (click)="cancelEntry()">Cancel </button>\n      <button ion-button (click)="saveEntry()">Save</button>\n    </ion-item>\n\n    <ion-item no-lines>\n      <p>Created: {{createDate}}</p>\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/kyliewojciechowski/Desktop/SI669/proj2/src/pages/entry-detail/entry-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_entry_data_service_entry_data_service__["a" /* EntryDataServiceProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */]])
    ], EntryDetailPage);
    return EntryDetailPage;
}());

//# sourceMappingURL=entry-detail.js.map

/***/ }),

/***/ 114:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 114;

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/entry-detail/entry-detail.module": [
		292,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 155;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Entry; });
var Entry = /** @class */ (function () {
    function Entry() {
    }
    return Entry;
}());

//# sourceMappingURL=entry.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__entry_detail_entry_detail__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_entry_data_service_entry_data_service__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, entryDataService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.entryDataService = entryDataService;
        this.entries = [];
        this.entryDataService.getObservable().subscribe(function (update) {
            _this.entries = entryDataService.getEntries();
            for (var _i = 0, _a = _this.entries; _i < _a.length; _i++) {
                var e = _a[_i];
                if (typeof e.timestamp === 'string') {
                    e.timestamp = new Date(e.timestamp);
                }
            }
            _this.entries.sort(function (a, b) {
                return a.timestamp.getTime() - b.timestamp.getTime();
            }).reverse();
            console.log(_this.entries);
        });
    }
    HomePage.prototype.addEntry = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__entry_detail_entry_detail__["a" /* EntryDetailPage */]);
    };
    HomePage.prototype.editEntry = function (entryID) {
        console.log("editing entry ", entryID);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__entry_detail_entry_detail__["a" /* EntryDetailPage */], { "entryID": entryID });
    };
    HomePage.prototype.deleteEntry = function (entryID) {
        this.entryDataService.removeEntry(entryID);
        console.log('deleting entry', entryID);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/kyliewojciechowski/Desktop/SI669/proj2/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      My Diary\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-list>\n      <ion-item>\n        <button ion-button full (click)="addEntry()">Add Entry</button>\n      </ion-item>\n\n    <ion-item *ngFor="let entry of entries">\n        <ion-label (click)="editEntry(entry.key)">\n        <img class="diaryimage" [src]="entry.image" /></ion-label>\n\n      <ion-label (click)="editEntry(entry.id)"><h2>{{entry.title}}</h2></ion-label>\n      <ion-label (click)="editEntry(entry.id)">\n        <p>{{entry.text}}</p>\n        <p>{{entry.timestamp}}</p>\n\n      </ion-label>\n      \n      <button ion-button clear icon-only item-end (click)="deleteEntry(entry.id)">\n          <ion-icon name="close-circle"></ion-icon>\n        </button>\n    </ion-item>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"/Users/kyliewojciechowski/Desktop/SI669/proj2/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_entry_data_service_entry_data_service__["a" /* EntryDataServiceProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(227);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_entry_detail_entry_detail__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_entry_data_service_entry_data_service__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__ = __webpack_require__(160);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_entry_detail_entry_detail__["a" /* EntryDetailPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/entry-detail/entry-detail.module#EntryDetailPageModule', name: 'EntryDetailPage', segment: 'entry-detail', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_entry_detail_entry_detail__["a" /* EntryDetailPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__["a" /* Camera */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__providers_entry_data_service_entry_data_service__["a" /* EntryDataServiceProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return firebaseConfig; });
var firebaseConfig = {
    // DO NOT PUT YOUR DATA IN THIS FILE. 
    // DO NOT PUSH REAL DATA TO GITHUB. 
    apiKey: "AIzaSyBtKz7UswWslStrq8KsmnqxUMzN7oDZ58g",
    authDomain: "proj2-si669.firebaseapp.com",
    databaseURL: "https://proj2-si669.firebaseio.com",
    projectId: "proj2-si669",
    storageBucket: "proj2-si669.appspot.com",
    messagingSenderId: "243250519509"
};
// The real data associated with this file should NOT be hosted on github. 
// You'll need to create a new file called firefile.ts inside the models folder
// that contains the real info here 
// I've added this dummy file so you all have access to it but then add 
// the real file name to the gitignore file. Git won't ignore files that have 
// already been pushed so thats why we need a new file. 
//# sourceMappingURL=firefile.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(203);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/kyliewojciechowski/Desktop/SI669/proj2/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/kyliewojciechowski/Desktop/SI669/proj2/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntryDataServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_entry__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_firefile__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the EntryDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var EntryDataServiceProvider = /** @class */ (function () {
    function EntryDataServiceProvider(storage) {
        var _this = this;
        this.storage = storage;
        this.entries = [];
        this.nextID = 0;
        __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.initializeApp(__WEBPACK_IMPORTED_MODULE_4__models_firefile__["a" /* firebaseConfig */]);
        this.db = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database();
        this.clientObservable = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observerThatWasCreated) {
            _this.serviceObserver = observerThatWasCreated;
        });
        var dataRef = this.db.ref('/allEntry');
        dataRef.on('value', function (snapshot) {
            _this.entries = []; //start with a blank list
            snapshot.forEach(function (childSnapshot) {
                var newbie = new __WEBPACK_IMPORTED_MODULE_1__models_entry__["a" /* Entry */];
                newbie.id = childSnapshot.val().id;
                newbie.title = childSnapshot.val().title;
                newbie.text = childSnapshot.val().text;
                newbie.image = childSnapshot.val().image;
                newbie.time = childSnapshot.val().time;
                newbie.timestamp = new Date(newbie.time);
                _this.entries.push(newbie);
            });
            _this.notifySubscribers();
        });
        var Ref = this.db.ref('/lastID');
        Ref.on('value', function (snapshot) {
            if (snapshot.exists()) {
                _this.nextID = (snapshot.val().nextID) + 1;
                //  console.log("HERES THE ID FROM STORAGE", this.nextID)
                _this.notifySubscribers();
            }
        });
    }
    EntryDataServiceProvider.prototype.getUniqueID = function () {
        var uniqueID = this.nextID++;
        var listRef = this.db.ref('/lastID');
        listRef.set({ 'nextID': uniqueID });
        return uniqueID;
    };
    EntryDataServiceProvider.prototype.addEntry = function (entry) {
        entry.id = this.getUniqueID();
        // console.log("HERES YOUR ID", entry.id)
        entry.timestamp = new Date();
        entry.time = entry.timestamp.getTime();
        this.entries.push(entry);
        this.notifySubscribers();
        this.saveData();
    };
    EntryDataServiceProvider.prototype.getEntries = function () {
        var entriesClone = JSON.parse(JSON.stringify(this.entries));
        return entriesClone;
    };
    EntryDataServiceProvider.prototype.getObservable = function () {
        return this.clientObservable;
    };
    EntryDataServiceProvider.prototype.notifySubscribers = function () {
        this.serviceObserver.next(undefined);
    };
    EntryDataServiceProvider.prototype.saveData = function () {
        var listRef = this.db.ref('/allEntry');
        for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            listRef.child(entry.id).set(entry);
        }
    };
    EntryDataServiceProvider.prototype.getEntryByID = function (id) {
        for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
            var e = _a[_i];
            if (e.id === id) {
                var clone = JSON.parse(JSON.stringify(e));
                return clone;
            }
        }
        return undefined;
    };
    EntryDataServiceProvider.prototype.updateEntry = function (id, newEntry) {
        var entryToUpdate = this.findEntryByID(id);
        entryToUpdate.title = newEntry.title;
        entryToUpdate.text = newEntry.text;
        entryToUpdate.timestamp = new Date();
        entryToUpdate.time = entryToUpdate.timestamp.getTime();
        entryToUpdate.image = newEntry.image;
        this.notifySubscribers();
        this.saveData();
    };
    EntryDataServiceProvider.prototype.findEntryByID = function (id) {
        for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
            var e = _a[_i];
            if (e.id === id) {
                return e;
            }
        }
        return undefined;
    };
    EntryDataServiceProvider.prototype.removeEntry = function (id) {
        var listRef = this.db.ref('/allEntry');
        for (var i = 0; i < this.entries.length; i++) {
            console.log(i);
            var iID = this.entries[i].id;
            if (iID === id) {
                this.entries.splice(i, 1);
                listRef.child(iID).remove();
                break;
            }
        }
        this.notifySubscribers();
        this.saveData();
    };
    EntryDataServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], EntryDataServiceProvider);
    return EntryDataServiceProvider;
}());

//# sourceMappingURL=entry-data-service.js.map

/***/ })

},[204]);
//# sourceMappingURL=main.js.map