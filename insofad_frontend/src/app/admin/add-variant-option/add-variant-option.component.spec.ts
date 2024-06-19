import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVariantOptionComponent } from './add-variant-option.component';

describe('AddVariantOptionComponent', () => {
  let component: AddVariantOptionComponent;
  let fixture: ComponentFixture<AddVariantOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVariantOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddVariantOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
