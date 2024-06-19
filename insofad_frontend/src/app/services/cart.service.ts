import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductVariant } from '../models/productvariant.model';
import { Options } from '../models/options.model';
import { GiftCard } from '../models/giftcard.model';
import { Topup } from '../models/topup.model';

const localStorageKey: string = "products-in-cart";
const localStorageGiftCardKey: string = "giftcards-in-cart";
const localStorageTopUpKey: string = "topups-in-cart";
const ordersKey: string = "user-orders";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private productsInCart: Product[] = [];
  private giftCardsInCart: GiftCard[] = [];
  private topUpsInCart: Topup[] = [];
  private currentAppliedGiftCardCodes: string[] = [];
  public $productInCart: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public $giftCardInCart: BehaviorSubject<GiftCard[]> = new BehaviorSubject<GiftCard[]>([]);
  public $topUpsInCart: BehaviorSubject<Topup[]> = new BehaviorSubject<Topup[]>([]);
  private userEmailKey: string = 'user-email';
  private productsInCartSubject = new Subject<Product[]>();

  public $productVariantInCart: BehaviorSubject<ProductVariant[]> = new BehaviorSubject<ProductVariant[]>([]);
  public $optionsInCart : BehaviorSubject<Options[]> = new BehaviorSubject<Options[]>([]);

  constructor() {
    this.loadProductsFromLocalStorage();
    this.loadGiftCardsFromLocalStorage();
    this.loadTopUpsFromLocalStorage();
  }

  public addProductToCart(product: Product) {
    this.productsInCart.push(product);
    this.saveProductsAndNotifyChange();
  }
  public setAppliedGiftCardCodes(listOfCodes: string[])
  {
    this.currentAppliedGiftCardCodes = listOfCodes;
  }

  public getAppliedGiftCardCodes()
  {
    return this.currentAppliedGiftCardCodes;
  }

  public removeProductFromCart(product_index: number) {
    this.productsInCart.splice(product_index, 1);
    this.saveProductsAndNotifyChange();
  }

  public allProductsInCart(): Product[] {
    return this.productsInCart.slice();
  }

  public getTotalPrice(): number {
    let subtotal = this.productsInCart.reduce((acc, product) => acc + product.price, 0);
    if (subtotal > 0) {
      return subtotal + 4.95;
    } else {
      return 0;
    }
  }

  public clearCart() {
    this.productsInCart = [];
    this.giftCardsInCart = [];
    this.topUpsInCart = [];
    this.saveProductsAndNotifyChange();
    this.saveGiftCardsAndNotifyChange();
    this.saveTopUpsAndNotifyChange();
  }

  public saveUserEmail(email: string): void {
    localStorage.setItem(this.userEmailKey, email);
  }

  public getUserEmail(): string | null {
    return localStorage.getItem(this.userEmailKey);
  }

  public clearCartAndUserEmail(): void {
    this.clearCart();
    localStorage.removeItem(this.userEmailKey);
  }

  public addGiftCardToCart(giftCard: GiftCard) {
    this.giftCardsInCart.push(giftCard);
    this.saveGiftCardsAndNotifyChange();
  }

  public removeGiftCardFromCart(giftCardIndex: number) {
    this.giftCardsInCart.splice(giftCardIndex, 1);
    this.saveGiftCardsAndNotifyChange();
  }

  public allGiftCardsInCart(): GiftCard[] {
    return this.giftCardsInCart.slice();
  }

  public addTopUpToCart(topUp: Topup) {
    this.topUpsInCart.push(topUp);
    this.saveTopUpsAndNotifyChange();
  }

  public removeTopUpFromCart(topUpIndex: number) {
    if (this.topUpsInCart[topUpIndex]) {
      this.topUpsInCart.splice(topUpIndex, 1);
    }
    this.saveTopUpsAndNotifyChange();
  }

  public allTopUpsInCart(): Topup[] {
    return this.topUpsInCart.slice();
  }

  public placeOrder(email: string): void {
    const orders = this.getOrders();
    orders[email] = this.productsInCart;
    localStorage.setItem(ordersKey, JSON.stringify(orders));
    this.clearCart();
  }

  public getOrdersForEmail(email: string): Product[] {
    const orders = this.getOrders();
    return orders[email] || [];
  }

  private getOrders(): { [email: string]: Product[] } {
    const ordersJson = localStorage.getItem(ordersKey);
    return ordersJson ? JSON.parse(ordersJson) : {};
  }

  public updateProductQuantity(index: number, quantity: number): void {
    if (index >= 0 && index < this.productsInCart.length) {
      const product = this.productsInCart[index];
      product.quantity = quantity;
      this.productsInCartSubject.next(this.productsInCart);
    }
  }

  // ------------ PRIVATE ------------------
  private saveProductsAndNotifyChange(): void {
    this.saveProductsToLocalStorage(this.productsInCart.slice());
    this.$productInCart.next(this.productsInCart.slice());
  }

  private saveProductsToLocalStorage(products: Product[]): void {
    localStorage.setItem(localStorageKey, JSON.stringify(products));
  }

  private loadProductsFromLocalStorage(): void {
    let productsOrNull = localStorage.getItem(localStorageKey);
    if (productsOrNull != null) {
      let products: Product[] = JSON.parse(productsOrNull);
      this.productsInCart = products;
      this.$productInCart.next(this.productsInCart.slice());
    }
  }

  private saveGiftCardsAndNotifyChange(): void {
    this.saveGiftCardsToLocalStorage(this.giftCardsInCart.slice());
    this.$giftCardInCart.next(this.giftCardsInCart.slice());
  }

  private saveGiftCardsToLocalStorage(giftCards: GiftCard[]): void {
    localStorage.setItem(localStorageGiftCardKey, JSON.stringify(giftCards));
  }

  private loadGiftCardsFromLocalStorage(): void {
    let giftCardsOrNull = localStorage.getItem(localStorageGiftCardKey);
    if (giftCardsOrNull != null) {
      let giftCards: GiftCard[] = JSON.parse(giftCardsOrNull);
      this.giftCardsInCart = giftCards;
      this.$giftCardInCart.next(this.giftCardsInCart.slice());
    }
  }

  private saveTopUpsAndNotifyChange(): void {
    this.saveTopUpsToLocalStorage(this.topUpsInCart.slice());
    this.$topUpsInCart.next(this.topUpsInCart.slice());
  }

  private saveTopUpsToLocalStorage(topUps: Topup[]): void {
    localStorage.setItem(localStorageTopUpKey, JSON.stringify(topUps));
  }

  private loadTopUpsFromLocalStorage(): void {
    let topUpsOrNull = localStorage.getItem(localStorageTopUpKey);
    if (topUpsOrNull != null) {
      let topUps: Topup[] = JSON.parse(topUpsOrNull);
      this.topUpsInCart = topUps;
      this.$topUpsInCart.next(this.topUpsInCart.slice());
    }
  }
}
