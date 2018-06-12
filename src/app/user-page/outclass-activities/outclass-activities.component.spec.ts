import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutclassActivitiesComponent } from './outclass-activities.component';

describe('OutclassActivitiesComponent', () => {
  let component: OutclassActivitiesComponent;
  let fixture: ComponentFixture<OutclassActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutclassActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutclassActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
