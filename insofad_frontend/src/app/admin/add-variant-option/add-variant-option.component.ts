import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Product} from '../../models/product.model';
import {ProductsService} from '../../services/products.service';
import {ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {ProductVariant} from "../../models/productvariant.model";
import {Option} from "@angular/cli/src/command-builder/utilities/json-schema";
import {Options} from "../../models/options.model";



@Component({
    selector: 'app-add-variant-option',
    standalone: true,
    imports: [
        RouterLink,
        ReactiveFormsModule,
        NgForOf
    ],
    templateUrl: './add-variant-option.component.html',
    styleUrl: './add-variant-option.component.scss'
})
export class AddVariantOptionComponent {

    @Input() public product!: Product;
    private productId: number;
    private  optionList:Options[] = [];
    optionAmount:number[] = [1,2];


    constructor(private activatedRoute: ActivatedRoute, private productService: ProductsService, private router: Router) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.productId = params['id'];
        });

        this.productService
            .getProductByIndex(this.productId)
            .subscribe((product: Product) => {
                this.product = product;
            });

    }

    buildProductObject(){
        // let newVariant = new ProductVariant(id, );

        // @ts-ignore
        const variantName = document.getElementById("variantName").value;
        // @ts-ignore
        const variantDescription = document.getElementById("variantDescription").value;

        const optionGroup = document.getElementById("optionGroup");

        // @ts-ignore
        let optionGroupList = optionGroup.childNodes;

        let optiondId:number = 0;

        let variantId:number = 0;

        for( let variant of this.product.variants){
            if(variant.id > variantId){
                variantId = variant.id;
            }

        }
        variantId += 1;


        optionGroupList?.forEach((element:Node) => {
            let elementChildNodes =  element.childNodes;

            if(elementChildNodes.length > 0){

                let optionNameElement = elementChildNodes[0];
                let optionPriceElement = elementChildNodes[2];


                // @ts-ignore
                let optionNameDiv = optionNameElement.childNodes;
                let optionPriceDiv = optionPriceElement.childNodes;


                // @ts-ignore
                let optionName:string = optionNameDiv[1].value;
                // @ts-ignore
                let optionPrice:number = optionPriceDiv[1].value;

                // const newOption = new Options(optiondId, optionName,optionPrice);

                optiondId+=1;

                const newOption = {
                    id:optiondId,
                    name:optionName,
                    added_price:Number(optionPrice),
                    orderProductList: []
                }


                this.optionList.push(newOption);

            }
        });

        let newVariant = {
            id:variantId,
            name:variantName,
            description:variantDescription,
            options: this.optionList
        }


        this.product.variants.push(newVariant);

        this.productService.addVariantToProduct(this.product);

        this.refreshProduct();

    }


    refreshProduct(){
        this.productService
            .getProductByIndex(this.productId)
            .subscribe((product: Product) => {
                this.product = product;
                this.product.price = product.price;


            });
    }




    addOption(){
        this.optionAmount.push(1);
    }

    removeOption(){
        this.optionAmount.pop();

    }


}