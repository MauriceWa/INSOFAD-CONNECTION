import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {GiftCard} from "../models/giftcard.model";
import {AuthService} from "../auth/auth.service";
import {GiftCardService} from "../services/giftcard.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CartService} from "../services/cart.service";
import {Topup} from "../models/topup.model";

@Component({
  selector: 'app-topup',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './topup.component.html',
  styleUrl: './topup.component.scss'
})
export class TopupComponent {

  giftCardToTopUp: GiftCard | null = null
  searchValue: string = "";
  errorMessage: string = "";
  successMessage: string = "";
  topUpAmount: number = 0;

  constructor(private authService: AuthService, private giftCardService: GiftCardService, private router: Router,
              private cartService: CartService) {
  }

  ngOnInit() {


  }

  public onSearch()
  {
    this.errorMessage = "";
    this.successMessage = "";

    this.giftCardService.getGiftCardByCode(this.searchValue)
        .subscribe((giftCard: GiftCard) => {
          if (!giftCard)
          {
            this.errorMessage = "Error searching for GiftCard.";
          }
          this.giftCardToTopUp = giftCard;
        },
            (err) =>{
              this.errorMessage = "Error searching for GiftCard.";
            });
  }

  public onCancel()
  {
    this.giftCardToTopUp = null;
    this.topUpAmount = 0;
    this.errorMessage = "";
    this.searchValue = "";
    this.successMessage = "";

  }

  public onAddToBalance()
  {
    if (!this.giftCardToTopUp) return;
    const newTopUp: Topup = {
        giftCardCode: this.giftCardToTopUp.code,
        topUpAmount: this.topUpAmount

    }
    this.cartService.addTopUpToCart(newTopUp);
      this.topUpAmount = 0;
      this.errorMessage = "";
      this.searchValue = "";
      this.successMessage = "Card top up successfully added to cart."
      this.giftCardToTopUp = null;


  }



}
