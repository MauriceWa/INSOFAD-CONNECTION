import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PromoCodeService } from "../services/promo-code.service";
import {Order} from "../models/order.model";
import {ProductsService} from "../services/products.service";
import {TokenService} from "../auth/token.service";
import {ProductVariant} from "../models/productvariant.model";
import {Options} from "../models/options.model";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public products_in_cart: Product[] = [];
  public shippingCosts: number = 4.95;
  public totalPrice: number = 0;
  public orderEmail: string = '';
  public promoCode: string = '';
  private promoCodeDiscount: number = 0;
  public appliedPromoCode: string = '';
  public discountAmount: number = 0;
  public selectedProductVariant: [ProductVariant | null , number | null ] = [null, null];
  public optionsDict: {[key: string]: Options} = {};
  quantity: number = 1;


  constructor(
      private cartService: CartService,
      private http: HttpClient,
      private router: Router,
      private promoCodeService: PromoCodeService,
      private productService: ProductsService,
        private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.products_in_cart = this.cartService.allProductsInCart() as Product[];
    this.cartService.$productInCart.subscribe((products: Product[]) => {
      this.products_in_cart = products;
      this.calculateTotalPrice();
      this.selectedProductVariant;
      this.optionsDict;
    });
    this.calculateTotalPrice();
  }

  onCheckCode(code: string) {
    this.promoCodeService.getPromoCode(code).subscribe((promoCode) => {
      this.promoCodeDiscount = promoCode.discount / 100; // Convert percentage to a fraction
      this.appliedPromoCode = code;
      this.calculateTotalPrice();
    }, error => {
      alert('Invalid promo code');
    });
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    if (this.products_in_cart.length > 0) {
      const productsTotal = this.products_in_cart.reduce((acc, product) => acc + product.price, 0);
      this.discountAmount = productsTotal * this.promoCodeDiscount;
      this.totalPrice = productsTotal + this.shippingCosts - this.discountAmount;
    }
  }

  public removeProductFromCart(product_index: number) {
    this.cartService.removeProductFromCart(product_index);
    this.calculateTotalPrice();
  }

  public clearCart() {
    this.cartService.clearCart();
    this.products_in_cart = [];
    this.appliedPromoCode = '';
    this.promoCodeDiscount = 0;
    this.calculateTotalPrice();
  }

  // Ivan zijn promocode cart
  // placeOrder() {
  //   this.calculateTotalPrice();
  //   if (this.totalPrice > 0) {
  //     console.log('Bestelling geplaatst met e-mail:', this.orderEmail);
  //     this.promoCodeService.usePromoCode(this.appliedPromoCode).subscribe();
  //     alert(`Bestelling succesvol geplaatst!\nTotaal: €${this.totalPrice.toFixed(2)}`);
  //     this.clearCart();
  //     this.router.navigate(['/products']);
  //   } else {
  //     alert('Voeg eerst producten toe aan je winkelwagen.');
  //   }
  // }

  updateOrderEmail(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.orderEmail = input.value;
    }
  }

  public updateProductQuantity(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value, 10);
    if (quantity >= 0) {
      this.cartService.updateProductQuantity(index, quantity);
    }
  }

  public sendOrders():void {
    let user_email = this.tokenService.getEmail();
    this.products_in_cart = this.cartService.allProductsInCart();

    let product_ids : number[] = [];

    this.products_in_cart.forEach( product =>{
      product_ids.push(product.id);
    })

    const order =  new Order(this.products_in_cart, user_email);

    this.productService.sendOrders(order);
    this.cartService.clearCart();

  }

  calculateProductPrice(product:Product): number{

    let resultPrice = product.price;
    product.variants.forEach((variant) =>
        variant.options.forEach((option) =>
            resultPrice += option.added_price
        )
    )


    return resultPrice;

  }



}
