import { TestBed } from '@angular/core/testing';

import {GiftCardService } from './giftcard.service';

describe('GiftcardService', () => {
  let service: GiftCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiftCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
