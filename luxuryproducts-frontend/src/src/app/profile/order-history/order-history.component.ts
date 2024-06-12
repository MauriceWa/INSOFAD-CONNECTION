import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.loadOrdersIn();
  }

  loadOrdersIn() {
    this.orderService.getOrdersByCurrentUser().subscribe(orders => {
      this.orders = orders;
    });
  }

  calculateTotal(order: Order): number {
    return order.total;
  }
}
