import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRoutingModule } from './user-page.routing';
import { UserPageComponent } from './user-page/user-page.component';
import { HeaderComponent } from './header/header.component';
import { JournalComponent } from './journal/journal.component';
import { OutclassActivitiesComponent } from './outclass-activities/outclass-activities.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { PersonalComponent } from './personal/personal.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [
    DashboardComponent, 
    HeaderComponent, 
    UserPageComponent, 
    JournalComponent, 
    OutclassActivitiesComponent, 
    ActivityDetailsComponent, PersonalComponent
  ],
  bootstrap: [],
})
export class UserPageModule { }
