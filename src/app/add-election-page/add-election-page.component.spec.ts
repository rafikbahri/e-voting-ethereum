import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddElectionPageComponent } from './add-election-page.component';

describe('AddElectionPageComponent', () => {
  let component: AddElectionPageComponent;
  let fixture: ComponentFixture<AddElectionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddElectionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddElectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
