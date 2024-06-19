import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftcardsOptionComponent } from './giftcards-option.component';

describe('AdminComponent', () => {
  let component: GiftcardsOptionComponent;
  let fixture: ComponentFixture<GiftcardsOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftcardsOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GiftcardsOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
