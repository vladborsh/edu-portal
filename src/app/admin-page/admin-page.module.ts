import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student/student.component';
import { AdminRoutingModule } from './admin-page.routing';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CommonsModule } from '../commons/commons.module';
import { SpecialitiesComponent } from './specialities/specialities.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeachersComponent } from './teachers/teachers.component';
import { NewStudentComponent } from './modals/new-student/new-student.component';
import { RemoveStudentComponent } from './modals/remove-student/remove-student.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
  ],
  entryComponents: [
    NewStudentComponent,
    RemoveStudentComponent
  ],
  providers: [
  ],
  bootstrap: []
})
export class AdminPageModule { }
