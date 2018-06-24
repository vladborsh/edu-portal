import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendService } from './backend.service';
import { SpecialityStoreService } from './services/speciality-store.service';
import { UserStoreService } from './services/user-store.service';
import { InstituteStoreService } from './services/institute-store.service';
import { LetDirective } from './directives/let.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    LetDirective
  ],
  exports: []
})
export class CommonsModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CommonsModule,
      providers: [
        BackendService, 
        UserStoreService,
        SpecialityStoreService, 
        InstituteStoreService,
      ]
    };
  }
}
