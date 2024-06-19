import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpaneldetailComponent } from './adminpaneldetail.component';

describe('AdminpaneldetailComponent', () => {
  let component: AdminpaneldetailComponent;
  let fixture: ComponentFixture<AdminpaneldetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminpaneldetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminpaneldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
