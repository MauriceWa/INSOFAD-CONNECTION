import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService } from '../auth/token.service';
import { environment } from "../../environments/environment";
import { GetOrder } from '../models/getorder.model';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OrderService{
    private baseUrl: string = environment.base_url + "/orders/user/";


    constructor(private http: HttpClient, private tokenService: TokenService) {}

    public getOrders(): Observable<GetOrder[]> {

        console.log(this.baseUrl + this.tokenService.getUserId());
        return this.http.get<GetOrder[]>(this.baseUrl + this.tokenService.getUserId());


    }

} 