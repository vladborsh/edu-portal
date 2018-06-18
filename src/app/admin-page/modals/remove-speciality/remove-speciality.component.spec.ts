import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveSpecialityComponent } from './remove-speciality.component';

describe('RemoveSpecialityComponent', () => {
  let component: RemoveSpecialityComponent;
  let fixture: ComponentFixture<RemoveSpecialityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveSpecialityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
