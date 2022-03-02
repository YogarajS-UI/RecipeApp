import { Ingredient } from "../shared/ingredient.model";

export class Recipe{
    public name: string;
    public describtion: string;
    public imagePath: string;
    public ingredients: Array<Ingredient>;
    constructor(name:string, desc:string, path:string, ing:Array<Ingredient>)
    {
     this.name = name;
     this.describtion = desc;
     this.imagePath = path;
     this.ingredients = ing;
    }

}