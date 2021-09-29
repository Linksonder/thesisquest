import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { environment } from '../environments/environment';
import { BootstrapModule } from './bootstrap.module';
import { LoginComponent } from './pages/login/login.component';
import { DailyQuestComponent } from './components/daily-quest/daily-quest.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ImportComponent } from './components/import/import.component';
import { QuestComponent } from './pages/quest/quest.component';
import { PaperComponent } from './components/paper/paper.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    DailyQuestComponent,
    InventoryComponent,
    ImportComponent,
    QuestComponent,
    PaperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BootstrapModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
