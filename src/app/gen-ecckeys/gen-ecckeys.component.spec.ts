import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenEcckeysComponent } from './gen-ecckeys.component';

describe('GenEcckeysComponent', () => {
  let component: GenEcckeysComponent;
  let fixture: ComponentFixture<GenEcckeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenEcckeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenEcckeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
