import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BackendService } from './backend.service';

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
      providers: [BackendService]
    };
  }
}
