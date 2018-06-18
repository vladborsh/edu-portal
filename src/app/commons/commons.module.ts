import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BackendService } from './backend.service';
import { SpecialityStoreService } from './services/speciality-store.service';
import { UserStoreService } from './services/user-store.service';
import { UserInfoService } from './services/user-info.service';
import { InstituteStoreService } from './services/institute-store.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
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
        UserInfoService, 
      ]
    };
  }
}
