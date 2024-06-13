import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GiftCard } from '../models/giftcard.model';

@Injectable({
  providedIn: 'root'
})
export class GiftCardService {
  private baseUrl = environment.base_url + '/giftcards';

  constructor(private http: HttpClient) { }

  createGiftCard(amount: number, recipientEmail: string): Observable<any> {
    const giftCardDTO = { amount: amount };
    return this.http.post(`${this.baseUrl}?recipientEmail=${recipientEmail}`, giftCardDTO);
  }

  validateGiftCard(code: string): Observable<GiftCard> {
    return this.http.get<GiftCard>(`${this.baseUrl}/${code}`);
  }

  getGiftCardByCode(giftCardCode: string): Observable<GiftCard> {
    return this.http.get<GiftCard>(`${this.baseUrl}/${giftCardCode}`)
  }

  returnAllGiftCards(): Observable<GiftCard[]> {
    return this.http.get<GiftCard[]>(`${this.baseUrl}/all`)
  }

  deductBalance(code: string, amount: number): Observable<any> {
    const url = `${this.baseUrl}/deduct/${code}?amount=${amount}`;
    return this.http.put(url, {});
  }

  addToBalance(code: string, amount: number): Observable<any> {
    const url = `${this.baseUrl}/add/${code}?amount=${amount}`;
    return this.http.put(url, {});
  }

  deleteCard(code: string): Observable<any> {
    const url = `${this.baseUrl}/delete/${code}`;
    return this.http.delete(url, {});
  }
}
