import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubheaderMenuComponent } from './subheader-menu.component';

describe('SubheaderMenuComponent', () => {
  let component: SubheaderMenuComponent;
  let fixture: ComponentFixture<SubheaderMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubheaderMenuComponent]
    });
    fixture = TestBed.createComponent(SubheaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
