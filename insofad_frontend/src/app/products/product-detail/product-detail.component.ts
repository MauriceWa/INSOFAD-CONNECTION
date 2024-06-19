import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service'; 
import { ProductVariant } from '../../models/productvariant.model';
import { Options } from '../../models/options.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  private productId: number; 
  public selectedProductVariant: [ProductVariant | null , number | null ] = [null, null];  
  public defaultprice: number = 0;    



  public copyProduct: Product; 
    
  public optionsDict: {[key: string]: Options} = {};   
  
  
  @Input() public product!: Product;
  @Output() public onBuyProduct: EventEmitter<Product> = new EventEmitter<Product>();


  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService, 
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.productId = params['id'];

    });

    this.productsService
    .getProductByIndex(this.productId)
    .subscribe((product: Product) => {
      this.product = product;
      product.variants.sort((a,b) => a.id - b.id);
      this.product.price = product.price;   
      if(this.defaultprice == 0 ){ 
        this.defaultprice = product.price; 
      } 
      this.copyProduct = structuredClone(product); 
      this.copyProduct.variants.forEach((variant) => {
        variant.options = []; 
      });

      this.product.variants.forEach((variant: ProductVariant) => {
        variant.options.sort((a,b) => a.id - b.id);
      });


    });


  }   



  public addToPrice(additional_cost: number, productVariant:ProductVariant, productOptions:Options){    

      
      let options_cost = productOptions.added_price;    
      
      this.optionsDict[productVariant.name] = productOptions  
    
      let total_additionalcost = 0; 

    
      for( let optionKey in this.optionsDict){ 
        let optionPrice = this.optionsDict[optionKey].added_price;   
  
        total_additionalcost += optionPrice; 
      }   

      this.product.price = this.defaultprice + total_additionalcost;     

  } 

 
  public buyProduct(product: Product) {


    let productQuantity = product.quantity; 

    if(productQuantity > 0 ){
      for( let variantName in this.optionsDict){ 
        for(const variant of this.copyProduct.variants) { 
            if(variant.name == variantName){   
                variant.options = []; 
                variant.options.push(this.optionsDict[variantName]); 
              
             }
        }   

    }       
 


    this.cartService.addProductToCart(this.copyProduct)  
    
    } else { 
      alert("Product is out of stock");
    }
 

  }


}
