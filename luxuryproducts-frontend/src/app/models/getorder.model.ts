import {Product} from "./product.model";
import {OrderProduct} from "./orderproduct.model";

export class GetOrder {
    public id: number;  
    public datum: Date; 
    public orderTitle: string;
    public orderPrice: number;
    public orderProducts: OrderProduct[];
  } 
  