import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { GiftCard } from '../models/giftcard.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Order } from '../models/order.model';
import {Topup} from "../models/topup.model";

const localStorageKey: string = "products-in-cart";
const localStorageGiftCardKey: string = "giftcards-in-cart";
const localStorageTopUpKey: string = "topups-in-cart";

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
  private baseUrl: string = environment.base_url + "/orders";
  private giftCardBaseUrl: string = environment.base_url + "/giftcards";
  private apiUrl = 'http://localhost:8080/api/orders';


  constructor(private http: HttpClient) {
    this.loadProductsFromLocalStorage();
    this.loadGiftCardsFromLocalStorage();
    this.loadTopUpsFromLocalStorage();
  }

  public addProductToCart(productToAdd: Product) {
    let existingProductIndex: number = this.productsInCart.findIndex(product => product.name === productToAdd.name);

    if (existingProductIndex !== -1) {
      this.productsInCart[existingProductIndex].amount += 1;
    } else {
      productToAdd.amount = 1;
      this.productsInCart.push(productToAdd);
    }

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


  public addGiftCardToCart(giftCardToAdd: GiftCard) {
    this.giftCardsInCart.push(giftCardToAdd);
    this.saveGiftCardsAndNotifyChange();
  }

  public removeGiftCardFromCart(giftCardIndex: number) {
    this.giftCardsInCart.splice(giftCardIndex, 1);
    this.saveGiftCardsAndNotifyChange();
  }

  public removeProductFromCart(productIndex: number) {
    if (this.productsInCart[productIndex].amount > 1) {
      this.productsInCart[productIndex].amount -= 1;
    } else {
      this.productsInCart.splice(productIndex, 1);
    }

    this.saveProductsAndNotifyChange();
  }

  public addTopUpToCard(topUp: Topup) {
    this.topUpsInCart.push(topUp);
    this.saveTopUpsAndNotifyChange();
  }

  public removeTopUpFromCard(topUpIndex: number)
  {
    if (this.topUpsInCart[topUpIndex]) {
      this.topUpsInCart.splice(topUpIndex, 1);
    }
    this.saveTopUpsAndNotifyChange();
  }

  public clearCart() {
    this.productsInCart = [];
    this.giftCardsInCart = [];
    this.topUpsInCart = [];
    this.saveProductsAndNotifyChange();
    this.saveGiftCardsAndNotifyChange();
    this.saveTopUpsAndNotifyChange();
  }

  public allProductsInCart(): Product[] {
    return this.productsInCart.slice();
  }

  public allGiftCardsInCart(): GiftCard[] {
    return this.giftCardsInCart.slice();
  }

  public allTopUpsInCart(): Topup[] {
    return this.topUpsInCart.slice();
  }

  public addOrder(order: Order): Observable<Order> {
    console.log("Ontvangen order: " + order);

    return this.http.post<Order>(this.baseUrl, order).pipe(
        catchError(error => {
          console.error('Error adding order:', error);
          return throwError(error);
        })
    );
  }

  public validateGiftCard(code: string): Observable<GiftCard> {
    return this.http.get<GiftCard>(`${this.giftCardBaseUrl}/${code}`);
  }

  // ------------ PRIVATE ------------------

  private saveProductsAndNotifyChange(): void {
    this.saveProductsToLocalStorage(this.productsInCart.slice());
    this.$productInCart.next(this.productsInCart.slice());
  }

  private saveGiftCardsAndNotifyChange(): void {
    this.saveGiftCardsToLocalStorage(this.giftCardsInCart.slice());
    this.$giftCardInCart.next(this.giftCardsInCart.slice());
  }

  private saveTopUpsAndNotifyChange(): void {
    this.saveTopUpsToLocalStorage(this.topUpsInCart.slice());
    this.$topUpsInCart.next(this.topUpsInCart.slice());
  }

  private saveTopUpsToLocalStorage(topups: Topup[]): void {
    localStorage.setItem(localStorageTopUpKey, JSON.stringify(topups));
  }

  private saveProductsToLocalStorage(products: Product[]): void {
    localStorage.setItem(localStorageKey, JSON.stringify(products));
  }

  private saveGiftCardsToLocalStorage(giftCards: GiftCard[]): void {
    localStorage.setItem(localStorageGiftCardKey, JSON.stringify(giftCards));
  }

  private loadProductsFromLocalStorage(): void {
    let productsOrNull = localStorage.getItem(localStorageKey);
    if (productsOrNull != null) {
      let products: Product[] = JSON.parse(productsOrNull);
      this.productsInCart = products;
      this.$productInCart.next(this.productsInCart.slice());
    }
  }

  private loadGiftCardsFromLocalStorage(): void {
    let giftCardsOrNull = localStorage.getItem(localStorageGiftCardKey);
    if (giftCardsOrNull != null) {
      let giftCards: GiftCard[] = JSON.parse(giftCardsOrNull);
      this.giftCardsInCart = giftCards;
      this.$giftCardInCart.next(this.giftCardsInCart.slice());
    }
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
