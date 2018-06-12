import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SpecialitiesComponent } from './specialities/specialities.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { TeachersComponent } from './teachers/teachers.component';

const routes: Routes = [
  { 
    path: '', component: AdminPageComponent,
    children: [
      { path: '', redirectTo: 'students', pathMatch: 'full' },
      { path: 'students', component: StudentComponent },
      { path: 'specialities', component: SpecialitiesComponent },
      { path: 'subjects', component: SubjectsComponent },
      { path: 'teachers', component: TeachersComponent }
    ] 
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
