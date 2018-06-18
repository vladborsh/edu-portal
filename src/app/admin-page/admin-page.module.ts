import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent, FilterStudents } from './student/student.component';
import { AdminRoutingModule } from './admin-page.routing';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CommonsModule } from '../commons/commons.module';
import { SpecialitiesComponent, FilterSpeciality } from './specialities/specialities.component';
import { SubjectsComponent, FilterSubjects } from './subjects/subjects.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeachersComponent, FilterTeachers } from './teachers/teachers.component';
import { NewStudentComponent } from './modals/new-student/new-student.component';
import { RemoveStudentComponent } from './modals/remove-student/remove-student.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RemoveTeacherComponent } from './modals/remove-teacher/remove-teacher.component';
import { RemoveSubjectComponent } from './modals/remove-subject/remove-subject.component';
import { RemoveSpecialityComponent } from './modals/remove-speciality/remove-speciality.component';
import { NewTeacherComponent } from './modals/new-teacher/new-teacher.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { NewSubjectComponent } from './modals/new-subject/new-subject.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { SpecialityDetailsComponent } from './speciality-details/speciality-details.component';
import { NewSpecialityComponent } from './modals/new-speciality/new-speciality.component';

@NgModule({
  imports: [
    NgbModule.forRoot(),
    CommonModule,
    CommonsModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ 
    NewStudentComponent,
    HeaderComponent,
    StudentComponent, 
    AdminPageComponent, 
    SpecialitiesComponent, 
    SubjectsComponent, 
    TeachersComponent, 
    RemoveStudentComponent, 
    FilterStudents,
    FilterTeachers,
    FilterSubjects,
    FilterSpeciality,
    RemoveTeacherComponent,
    RemoveSubjectComponent,
    RemoveSpecialityComponent,
    NewTeacherComponent,
    StudentDetailsComponent,
    TeacherDetailsComponent,
    NewSubjectComponent,
    SubjectDetailsComponent,
    SpecialityDetailsComponent,
    NewSpecialityComponent,
  ],
  entryComponents: [
    NewStudentComponent,
    NewTeacherComponent,
    NewSubjectComponent,
    NewSpecialityComponent,
    RemoveStudentComponent,
    RemoveTeacherComponent,
    RemoveSubjectComponent,
    RemoveSpecialityComponent,
  ],
  providers: [
  ],
  bootstrap: []
})
export class AdminPageModule { }
