import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shoppingList.service";
import { Recipe } from "./recipe.model";

@Injectable()

export class  RecipeServices{
    public recipeChanged = new Subject<Recipe[]>();

    constructor(private shoppingListService:ShoppingListService){}
    private recipes: Array<Recipe> = [];
//    private recipes: Array<Recipe> = [
//        new Recipe('Biryani','Are You Ready to Taste?','https://st.depositphotos.com/3147737/4962/i/950/depositphotos_49622201-stock-photo-hyderabadi-biryani-a-popular-chicken.jpg',
//         [new Ingredient ('Chicken 65',100)]),
//     new Recipe('Grilled Chicken','Yummy','https://wallpapercave.com/wp/wp8327480.jpg',
//     [new Ingredient('7 UP',70)])];


  
getRecipe(){
    return this.recipes.slice();
}

getRecipeById(index:number){
  
    return  this.recipes[index];
}
addIngToShopList(ing:Ingredient[]){
this.shoppingListService.addingFromRecipe(ing);
}

addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
}

updateRecipe(index:number,recipe:Recipe){
   this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
}

deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
}
 
setRecipe(recipe:Recipe[]){
this.recipes = recipe;
this.recipeChanged.next(this.recipes?.slice());
}

}