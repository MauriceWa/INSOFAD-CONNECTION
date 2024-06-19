import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';
import { AuthService } from "../auth/auth.service";
import { GiftCard } from '../models/giftcard.model';
import { FormsModule } from "@angular/forms";
import { GiftCardService } from '../services/giftcard.service';
import { Topup } from "../models/topup.model";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, NgFor, NgIf, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public products_in_cart: Product[] = [];
  public giftCards_in_cart: GiftCard[] = [];
  public topUpsInCart: Topup[] = [];
  public appliedGiftCards: GiftCard[] = [];
  public giftCardCode: string = '';
  public userIsLoggedIn: boolean = false;
  public amountOfProducts: number = 0;
  public errorNotLoggedInMessage: string = ''

  constructor(private cartService: CartService, private giftCardService: GiftCardService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.products_in_cart = this.cartService.allProductsInCart();
    this.giftCards_in_cart = this.cartService.allGiftCardsInCart();
    this.topUpsInCart = this.cartService.allTopUpsInCart();

    this.cartService.$productInCart.subscribe((products: Product[]) => {
      this.products_in_cart = products;
      this.updateAmountOfProducts();
    });

    this.cartService.$giftCardInCart.subscribe((giftCards: GiftCard[]) => {
      this.giftCards_in_cart = giftCards;
      this.updateAmountOfProducts();
    });

    this.cartService.$topUpsInCart.subscribe((topUps: Topup[]) => {
      this.topUpsInCart = topUps;
      this.updateAmountOfProducts();
    })

    this.checkLoginState();
  }

  private updateAmountOfProducts() {
    this.amountOfProducts = (this.products_in_cart.length > 0 ? this.products_in_cart.length : 0)
        + (this.giftCards_in_cart.length > 0 ? this.giftCards_in_cart.length : 0)
        + (this.topUpsInCart.length > 0 ? this.topUpsInCart.length : 0);
  }

  public clearCart() {
    this.cartService.clearCart();
    this.appliedGiftCards = [];
    this.giftCardCode = '';
  }

  public removeProductFromCart(product_index: number) {
    this.cartService.removeProductFromCart(product_index);
  }

  public removeGiftCardFromCart(giftCard_index: number) {
    this.cartService.removeGiftCardFromCart(giftCard_index);
  }

  public removeTopUpsFromCart(topUp_index: number) {
    this.cartService.removeTopUpFromCart(topUp_index);
  }

  public getTotalPrice(): number {
    let total = this.products_in_cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

    this.giftCards_in_cart.forEach((giftCard) => {
      total += giftCard.amount;
    });

    this.topUpsInCart.forEach((topUp) => {
      total += topUp.topUpAmount;
    });

    if (this.appliedGiftCards) {
      this.appliedGiftCards.forEach((giftCard) => {
        total -= giftCard.balance;
      })
    }
    return total < 0 ? 0 : total;
  }

  public applyGiftCard() {
    if (!this.userIsLoggedIn) {
      this.errorNotLoggedInMessage = 'You need to be logged in to apply a giftcard!';
      return;
    }
    if (this.giftCardCode.trim() !== '') {
      this.giftCardService.validateGiftCard(this.giftCardCode).subscribe(
          (giftCard: GiftCard | null) => {
            if (giftCard) {
              this.appliedGiftCards = this.appliedGiftCards.filter((card) => card.code !== giftCard.code);
              this.appliedGiftCards.push(giftCard);
              this.giftCardCode = '';
            }
          },
          (error: any) => {
            console.error('Failed to apply gift card:', error);
          }
      );
    }
  }

  public onInvalidOrder() {
    return this.amountOfProducts === 0;
  }

  public onOrder() {
    if (!this.userIsLoggedIn) {
      this.router.navigateByUrl('/auth/login');
    } else {
      this.cartService.setAppliedGiftCardCodes(this.appliedGiftCards.map(giftcard => giftcard.code));
      this.router.navigateByUrl('/orders');
    }
  }

  public checkLoginState(): void {
    this.authService.$userIsLoggedIn.subscribe((loginState: boolean) => {
      this.userIsLoggedIn = loginState;
    });
  }
}
