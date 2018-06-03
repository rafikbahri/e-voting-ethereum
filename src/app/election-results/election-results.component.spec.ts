import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionResultsComponent } from './election-results.component';

describe('ElectionResultsComponent', () => {
  let component: ElectionResultsComponent;
  let fixture: ComponentFixture<ElectionResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectionResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
