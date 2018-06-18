import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveSubjectComponent } from './remove-subject.component';

describe('RemoveSubjectComponent', () => {
  let component: RemoveSubjectComponent;
  let fixture: ComponentFixture<RemoveSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
