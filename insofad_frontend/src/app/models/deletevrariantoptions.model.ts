export class DeleteVariantOptions {
    public variant_ids: number[] = [];
    public option_ids:number[] = [];

    constructor(variant_ids: number[], option_ids: number[]){
        this.variant_ids = variant_ids;
        this.option_ids = option_ids;
    }

}
