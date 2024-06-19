import { Component,Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import { Router, } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ElementRef } from '@angular/core';
import { DeleteVariantOptions } from '../../models/deletevrariantoptions.model';

@Component({
  selector: 'app-delete-variant-option',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './delete-variant-option.component.html',
  styleUrl: './delete-variant-option.component.scss'
})
export class DeleteVariantOptionComponent {

  private productId: number;
  private selectedOptionsList:number[] = [];
  private selectedVariantsList:number[] = [];

  @Input() public product!: Product;

  constructor(private activatedRoute: ActivatedRoute,  private productsService: ProductsService, private elementRef: ElementRef<HTMLElement>  ){

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.productId = params['id'];
    });

    this.refreshProduct();

  }


  toggleDiv(id:number){
    let stringid = id.toString();
    const element = document.getElementById(stringid);

    const checkBoxes = element?.querySelectorAll("input[type='checkbox']");


    checkBoxes?.forEach((checkbox: Node) => {

      if(checkbox instanceof HTMLInputElement){

        checkbox.disabled = !checkbox.disabled;
      }

    })

    if(this.selectedVariantsList.includes(id)){

      this.selectedVariantsList = this.selectedVariantsList.filter(setid => setid !== id);


    } else {
      this.selectedVariantsList.push(id);


    }




  }

  selectedOption(id:number){

    if(this.selectedOptionsList.includes(id)){

      this.selectedOptionsList = this.selectedOptionsList.filter(setid => setid !== id);

    } else {
      this.selectedOptionsList.push(id);

    }



  }

  buildProductVariantOptionList():DeleteVariantOptions{
    return new DeleteVariantOptions(this.selectedVariantsList, this.selectedOptionsList);

  }

  postDeleteVariantOptions(){
    this.productsService.sendDeleteProductVariantOption(this.buildProductVariantOptionList()).subscribe(() => {

      this.refreshProduct();

    });



  }


  refreshProduct(){
    this.productsService
        .getProductByIndex(this.productId)
        .subscribe((product: Product) => {
          this.product = product;
          this.product.price = product.price;
        });
  }








}
