import {Component, Input, NgModule} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {Product} from "../../models/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {Options} from "../../models/options.model";
import {ProductVariant} from "../../models/productvariant.model";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-update-variant-option',
    standalone: true,
    imports: [
        NgForOf,
        ReactiveFormsModule
    ],
    templateUrl: './update-variant-option.component.html',
    styleUrl: './update-variant-option.component.scss'
})
export class UpdateVariantOptionComponent {

    @Input() public product!: Product;
    private productId: number;
    public selectedProductVariant: ProductVariant | undefined;



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

    onSelectionChange(event:Event){
        const element = event.target as HTMLSelectElement;
        const selectedId = element.value;

        this.selectedProductVariant = this.product.variants.find((variant: ProductVariant) => variant.id === Number(selectedId));



    }


    sendUpdatedVariant(){

        // @ts-ignore
        const variantName = document.getElementById("variantName").value;
        // @ts-ignore
        const variantDescription = document.getElementById("variantDescription").value;

        if(this.selectedProductVariant) {

            this.selectedProductVariant.name = variantName;
            this.selectedProductVariant.description = variantDescription;


            const optionGroup = document.getElementById("optionGroup");

            // @ts-ignore
            let optionGroupList = optionGroup.childNodes;

            optionGroupList?.forEach((element: Node) => {
                let elementChildNodes = element.childNodes;

                if (elementChildNodes.length > 0) {

                    let optionNameElement = elementChildNodes[0];
                    let optionPriceElement = elementChildNodes[2];


                    // @ts-ignore
                    let optionNameDiv = optionNameElement.childNodes;
                    let optionPriceDiv = optionPriceElement.childNodes;

                    // @ts-ignore
                    let optionId = optionNameDiv[0].id;

                    // @ts-ignore
                    let optionName: string = optionNameDiv[1].value;
                    // @ts-ignore
                    let optionPrice: number = optionPriceDiv[1].value;

                    const updatedOption = this.selectedProductVariant?.options.find((option: Options) => option.id === Number(optionId));



                    if (updatedOption) {
                        updatedOption.name = optionName;
                        updatedOption.added_price = Number(optionPrice);

                    }


                }


            });

            this.productService.updateVariantToProduct(this.product);

            this.refreshProduct();

        }

    }


    refreshProduct(){
        this.productService
            .getProductByIndex(this.productId)
            .subscribe((product: Product) => {
                this.product = product;
                this.product.price = product.price;


            });
    }


}
