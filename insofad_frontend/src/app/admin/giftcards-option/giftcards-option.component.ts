import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {GiftCardService} from "../../services/giftcard.service";
import {GiftCard} from "../../models/giftcard.model";
import {Observable} from "rxjs";
import {AsyncPipe, CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-admin',
  standalone: true,
    imports: [
        AsyncPipe,
        NgForOf,
        NgIf,
        FormsModule,
        CurrencyPipe
    ],
  templateUrl: './giftcards-option.component.html',
  styleUrl: './giftcards-option.component.scss'
})
export class GiftcardsOptionComponent implements OnInit {

  public giftCards$: Observable<GiftCard[]> | undefined;
  public giftCardToModify: GiftCard | null = null;
  public giftCardToDelete: GiftCard | null = null;
  amountValue: number = 0;


  constructor(private authService: AuthService, private giftCardService: GiftCardService, private router: Router) {
  }

  ngOnInit() {
    this.giftCards$ = this.giftCardService.returnAllGiftCards();


  }

  public onModifyGiftCard(giftCardToModify: GiftCard)
  {
    this.giftCardToModify = giftCardToModify;
  }

  public onDeleteGiftCard(giftCardToDelete: GiftCard)
  {
    this.giftCardToDelete = giftCardToDelete;
  }

  public onAddToBalance()
  {
    if (!this.giftCardToModify) return;

    this.giftCardService.addToBalance(this.giftCardToModify.code, this.amountValue)
        .subscribe(() => {
          this.giftCards$ = this.giftCardService.returnAllGiftCards()
          this.giftCardToModify = null;
          this.giftCardToDelete = null;
          this.amountValue = 0;
        });
  }

  public onRemoveFromBalance()
  {
    if (!this.giftCardToModify) return;

    this.giftCardService.deductBalance(this.giftCardToModify.code, this.amountValue)
        .subscribe(() => {
          this.giftCards$ = this.giftCardService.returnAllGiftCards();
          this.giftCardToModify = null;
          this.giftCardToDelete = null;
          this.amountValue = 0;
        });
  }

  public onDeleteCard()
  {
    if (!this.giftCardToDelete) return;

    this.giftCardService.deleteCard(this.giftCardToDelete.code)
        .subscribe(() => {
          this.giftCards$ = this.giftCardService.returnAllGiftCards();
          this.giftCardToModify = null;
          this.giftCardToDelete = null;
        });
  }

  public onCancel()
  {
    this.giftCardToModify = null;
    this.giftCardToDelete = null;
  }
}
