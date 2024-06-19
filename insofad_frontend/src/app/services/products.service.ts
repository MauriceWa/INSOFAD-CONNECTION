import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';
import { DeleteVariantOptions } from '../models/deletevrariantoptions.model';
import {ProductVariant} from "../models/productvariant.model";
import {Options} from "../models/options.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = environment.base_url + "/products";

  private _orderEndpoint: string = 'http://localhost:8080/api/orders';


  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  public getProductByIndex(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);

  }

  public updateProductByIndex(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  public sendOrders(request: Order): void{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };

    this.http
        .post<Order>(this._orderEndpoint, JSON.stringify(request), httpOptions )
        .subscribe(

            res=>{

              console.log(res);

            },     err=>{

              console.log(err);

            });

  }

  public sendDeleteProductVariantOption(deleteVariantOptions:DeleteVariantOptions){
    return this.http.post<DeleteVariantOptions>(`${this.baseUrl}/deleteVariants`, deleteVariantOptions);
  }

  // addVariantToProduct(productId: number, variant: ProductVariant, option:Options): Observable<Product> {
  //   return this.http.post<Product>(`${this.baseUrl}/${productId}/addVariants`, JSON.stringify(variant),  option);
  // }


  public addVariantToProduct(request: Product): void{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };

    this.http
        .post<Product>( `${this.baseUrl}/${request.id}/addVariants`, JSON.stringify(request), httpOptions )
        .subscribe(

            res=>{

              console.log(res);

            },     err=>{

              console.log(err);

            });

  }


  public updateVariantToProduct(request: Product): void{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };

    this.http
        .post<Product>( `${this.baseUrl}/${request.id}/updateVariants`, JSON.stringify(request), httpOptions )
        .subscribe(

            res=>{

              console.log(res);

            },     err=>{

              console.log(err);

            });

  }

  public updateProductQuantity(request: Product): void{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };


    this.http
        .post<Product>( `${this.baseUrl}/${request.id}/updateproduct`, JSON.stringify(request), httpOptions )
        .subscribe(

            res=>{

              console.log(res);

            },     err=>{

              console.log(err);

            });

  }



}
