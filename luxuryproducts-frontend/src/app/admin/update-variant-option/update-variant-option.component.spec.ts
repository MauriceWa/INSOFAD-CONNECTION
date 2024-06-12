import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVariantOptionComponent } from './update-variant-option.component';

describe('UpdateVariantOptionComponent', () => {
  let component: UpdateVariantOptionComponent;
  let fixture: ComponentFixture<UpdateVariantOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateVariantOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateVariantOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
