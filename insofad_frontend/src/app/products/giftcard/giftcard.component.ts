import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GiftCardService } from '../../services/giftcard.service';
import { CartService } from '../../services/cart.service';
import { GiftCard } from '../../models/giftcard.model';

@Component({
    selector: 'app-giftcard',
    templateUrl: './giftcard.component.html',
    styleUrls: ['./giftcard.component.scss']
})
export class GiftCardComponent {
    amount: number = 10;
    recipientEmail: string = '';
    message: string = '';

    constructor(
        private giftCardService: GiftCardService,
        private cartService: CartService,
        private router: Router
    ) { }

    setAmount(value: number): void {
        this.amount = value;
    }

    onSubmit(): void {
        let giftCardToBuy: GiftCard = {
            amount: this.amount,
            balance: 0,
            code: "",
            expiryDate: new Date(),
            id: "",
            recipientEmail: this.recipientEmail

        }

        this.message = 'Gift card purchased successfully!';
        this.amount = 0;
        this.recipientEmail = '';
        this.cartService.addGiftCardToCart(giftCardToBuy);
        this.router.navigate(['/cart']);


    }
}
