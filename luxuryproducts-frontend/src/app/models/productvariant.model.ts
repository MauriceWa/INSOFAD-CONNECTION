// import { Category } from "./category.model";

import { Options } from "./options.model";

export class ProductVariant {
    public id: number;
    public name: string;
    public description: string;
    public options: Options[];  
  
    constructor(id: number, name: string, description: string, options: Options[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.options =  options; 
      }
      
  }
  