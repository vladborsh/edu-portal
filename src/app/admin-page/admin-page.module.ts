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

@NgModule({
  imports: [
    NgbModule.forRoot(),
    CommonModule,
    CommonsModule,
    AdminRoutingModule,
  ],
  declarations: [ 
    HeaderComponent,
    StudentComponent, 
    AdminPageComponent, 
    SpecialitiesComponent, 
    SubjectsComponent, 
    TeachersComponent
  ],
  bootstrap: []
})
export class AdminPageModule { }
