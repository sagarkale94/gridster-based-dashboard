import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalLayoutComponent } from './final-layout.component';

describe('FinalLayoutComponent', () => {
  let component: FinalLayoutComponent;
  let fixture: ComponentFixture<FinalLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
