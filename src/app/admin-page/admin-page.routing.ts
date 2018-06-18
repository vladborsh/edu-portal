import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SpecialitiesComponent } from './specialities/specialities.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { TeachersComponent } from './teachers/teachers.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { SpecialityDetailsComponent } from './speciality-details/speciality-details.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupDetailsComponent } from './group-details/group-details.component';

const routes: Routes = [
  { 
    path: '', component: AdminPageComponent,
    children: [
      { path: '', redirectTo: 'students', pathMatch: 'full' },
      { path: 'students', component: StudentComponent },
      { path: 'student-details/:id', component: StudentDetailsComponent },
      { path: 'specialities', component: SpecialitiesComponent },
      { path: 'speciality-details/:id', component: SpecialityDetailsComponent },
      { path: 'subjects', component: SubjectsComponent },
      { path: 'subject-details/:id', component: SubjectDetailsComponent },
      { path: 'teachers', component: TeachersComponent },
      { path: 'teacher-details/:id', component: TeacherDetailsComponent },
      { path: 'groups', component: GroupsComponent },
      { path: 'group-details/:id', component: GroupDetailsComponent },
    ] 
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
