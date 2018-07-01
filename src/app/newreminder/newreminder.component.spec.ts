import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewreminderComponent } from './newreminder.component';

describe('NewreminderComponent', () => {
  let component: NewreminderComponent;
  let fixture: ComponentFixture<NewreminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewreminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewreminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
