import { Product } from "./product.model";

export class Order {
    public products:Product[];
    public email: string;


    constructor(products:Product[], email:string){
        this.products = products;
        this.email = email;
    }

}