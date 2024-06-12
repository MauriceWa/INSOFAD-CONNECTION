import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVariantOptionComponent } from './delete-variant-option.component';

describe('DeleteVariantOptionComponent', () => {
  let component: DeleteVariantOptionComponent;
  let fixture: ComponentFixture<DeleteVariantOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteVariantOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteVariantOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
