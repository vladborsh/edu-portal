import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { JournalComponent } from './journal/journal.component';
import { OutclassActivitiesComponent } from './outclass-activities/outclass-activities.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { UserPageComponent } from './user-page/user-page.component';
import { PersonalComponent } from './personal/personal.component';

const routes: Routes = [
  {
    path: '', component: UserPageComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'personal', component: PersonalComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'journal', component: JournalComponent },
      { path: 'activity', component: OutclassActivitiesComponent },
      { path: 'activity/:id', component: ActivityDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
