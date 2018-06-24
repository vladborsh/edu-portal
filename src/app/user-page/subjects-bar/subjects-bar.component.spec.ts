import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsBarComponent } from './subjects-bar.component';

describe('SubjectsBarComponent', () => {
  let component: SubjectsBarComponent;
  let fixture: ComponentFixture<SubjectsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
