import { Component, OnInit } from '@angular/core';
import { CartService } from "../services/cart.service";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';
import { GiftCard } from '../models/giftcard.model';
import { Topup } from "../models/topup.model";
import { GiftCardService } from "../services/giftcard.service";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public bestelForm: FormGroup;
  public products_in_cart: Product[];
  public giftCards_in_cart: GiftCard[];
  public topUps_in_cart: Topup[];
  public order: Order;
  public errorMessage: string = '';

  constructor(private cartService: CartService, private router: Router, private fb: FormBuilder,
              private giftCardService: GiftCardService) {}

  ngOnInit(): void {
    this.products_in_cart = this.cartService.allProductsInCart();
    this.giftCards_in_cart = this.cartService.allGiftCardsInCart();
    this.topUps_in_cart = this.cartService.allTopUpsInCart();
    this.bestelForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      houseNumber: ['', [Validators.required, Validators.maxLength(5)]],
      notes: ['']
    });
  }

  public clearCart() {
    this.cartService.clearCart();
  }

  private calculateTotal(): number {
    let total = 0;
    for (const product of this.products_in_cart) {
      total += product.price * (product.amount || 1);
    }
    for (const giftCard of this.giftCards_in_cart) {
      total += giftCard.amount;
    }
    for (const topUp of this.topUps_in_cart) {
      total += topUp.topUpAmount;
    }
    return total < 0 ? 0 : total;
  }

  private calculateTopUpTotal(): number {
    if (this.topUps_in_cart.length === 0) return 0;
    let amount = 0;
    this.topUps_in_cart.forEach((topUp) => {
      amount += topUp.topUpAmount;
    });
    return amount;
  }

  public async onSubmit() {
    const formData = this.bestelForm.value;
    this.errorMessage = '';

    if (!formData.name) {
      this.errorMessage = 'Please enter a first name!';
      return;
    }

    if (!formData.lastName) {
      this.errorMessage = 'Please enter a last name!';
      return;
    }

    if (this.zipCodeValidator(formData.zipCode)) {
      this.errorMessage = 'Invalid ZipCode! Example zip code: 1234AB.';
      return;
    }

    if (formData.houseNumber < 1) {
      this.errorMessage = 'Invalid HouseNumber! The house number should be greater than 0.';
      return;
    }

    try {
      const giftCardsPurchased: GiftCard[] = await Promise.all(
          this.giftCards_in_cart.map((giftCard) => {
            return this.giftCardService.createGiftCard(giftCard.amount, giftCard.recipientEmail).toPromise()
                .then((response: GiftCard) => {
                  response.recipientEmail = giftCard.recipientEmail;
                  return response;
                });
          })
      );

      this.order = {
        id: formData.id,
        name: formData.name,
        last_name: formData.lastName,
        zipcode: formData.zipCode,
        houseNumber: formData.houseNumber,
        notes: formData.notes,
        orderDate: formData.orderDatum,
        appliedGiftCards: this.cartService.getAppliedGiftCardCodes(),
        products: this.products_in_cart,
        giftCards: giftCardsPurchased, // Use the purchased gift cards
        cardsToppedUp: this.topUps_in_cart.map((topUp) => topUp.giftCardCode),
        top_up_amount: this.calculateTopUpTotal(),
        total: this.calculateTotal()
      };

      const result = await this.cartService.addOrder(this.order).toPromise();
      console.log('Order added successfully:', result);

      await Promise.all(this.topUps_in_cart.map((topUp) => {
        return this.giftCardService.addToBalance(topUp.giftCardCode, topUp.topUpAmount).toPromise();
      }));

      this.clearCart();
      this.router.navigateByUrl('/paymentsuccessful');

    } catch (error:any) {
      if (error.status === 200) {
        await Promise.all(this.topUps_in_cart.map((topUp) => {
          return this.giftCardService.addToBalance(topUp.giftCardCode, topUp.topUpAmount).toPromise();
        }));
        this.clearCart();
        this.router.navigateByUrl('/paymentsuccessful');
      } else {
        console.error('Failed to add order:', error);
      }
    }
  }

  private zipCodeValidator(zipCodeValue: string): boolean {
    const zipCodePattern = /^\d{4}[A-Z]{2}$/;
    return !(zipCodeValue && zipCodePattern.test(zipCodeValue));
  }
}
