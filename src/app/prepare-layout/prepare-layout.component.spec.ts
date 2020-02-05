import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareLayoutComponent } from './prepare-layout.component';

describe('PrepareLayoutComponent', () => {
  let component: PrepareLayoutComponent;
  let fixture: ComponentFixture<PrepareLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepareLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
