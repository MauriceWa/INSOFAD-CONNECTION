import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {CartService} from "../../services/cart.service";
import {Product} from "../../models/product.model";
import {User} from "../../models/user.model";
import {GiftCard} from "../../models/giftcard.model";
import {Topup} from "../../models/topup.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public userIsLoggedIn: boolean = false;
  public isDropdownOpen: boolean = false;
  public amountOfProducts: number = 0;

  constructor(private authService: AuthService, private router: Router, private cartService: CartService) {
  }

  public ngOnInit(): void {
    this.checkLoginState();

    this.cartService.$productInCart.subscribe((products: Product[]) => {
      const productCount = products.reduce((total, product) => total + product.amount, 0);

      this.cartService.$giftCardInCart.subscribe((giftcards: GiftCard[]) => {
        const giftCardCount = giftcards.length; // Count of gift cards
        this.cartService.$topUpsInCart.subscribe((topUps: Topup[]) => {
          const topUpCount = topUps.length;
          this.amountOfProducts = productCount + giftCardCount + topUpCount; // Sum of products and gift cards

        });
      });
    });
  }

  public onLogout(): void {
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  public checkLoginState(): void {

    this.authService
      .$userIsLoggedIn
      .subscribe((loginState: boolean) => {
        this.userIsLoggedIn = loginState;
      });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  public isUserAdmin() : boolean
  {
    return this.authService.userIsAdmin;
  }
}
