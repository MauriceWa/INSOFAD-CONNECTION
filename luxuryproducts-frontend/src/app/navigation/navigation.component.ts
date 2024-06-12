import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { User } from "../models/user.model";
import { GiftCard } from "../models/giftcard.model";
import { Topup } from "../models/topup.model";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit, OnDestroy {

  title = 'Shopping Cart';

  public amountOfProducts: number = 0;

  isAuthenticated = false;
  isAdmin = false;

  private userSub: Subscription;
  private cartSub: Subscription;

  constructor(private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => this.ProcessUser(user));

    this.cartSub = this.cartService.$productInCart.subscribe((products: Product[]) => {
      const productCount = products.length;

      this.cartService.$giftCardInCart.subscribe((giftcards: GiftCard[]) => {
        const giftCardCount = giftcards.length;

        this.cartService.$topUpsInCart.subscribe((topUps: Topup[]) => {
          const topUpCount = topUps.length;

          this.amountOfProducts = productCount + giftCardCount + topUpCount;
        });
      });
    });
  }

  private ProcessUser(user: User | null): void {
    if (user) {
      console.log('User:', user);

      this.isAuthenticated = !!user;
      console.log("UserRole In Nav bar", user.role)
      this.isAdmin = user.role === 'ROLE_ADMIN';

    } else {
      this.isAuthenticated = false;
      this.isAdmin = false;
      console.log('User is not logged in');
    }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.cartSub.unsubscribe();
  }
}
