import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { LoginComponent } from '../auth/login/login.component';
import { GetOrder } from '../models/getorder.model';
import { Order } from '../models/order.model';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit{
  public orders: GetOrder[] = new Array<GetOrder>();
  public loadingOrders: boolean = true;
  public user_email : String;




  constructor(private OrderService: OrderService) {}

  ngOnInit(): void {

    this.OrderService
        .getOrders()
        .subscribe((orders: GetOrder[]) => {
          this.loadingOrders = false;
          this.orders = orders;
          console.log(orders);

        });
  }





}