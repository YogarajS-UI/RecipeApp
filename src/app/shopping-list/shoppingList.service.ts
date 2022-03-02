import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    public editClicked = new Subject<number>();
    public addNewClicked = new Subject<Ingredient[]>();
   private ingredients: Array<Ingredient> =[
        new Ingredient('Apple',5),
        new Ingredient('Orange',5) ]
        getIngredients(){
            return this.ingredients.slice();
        }
        getIngredientsByIndex(index:number){
          return this.ingredients[index];
        }
        addNew(ing:Ingredient){
         this.ingredients.push(ing);
         this.addNewClicked.next(this.ingredients.slice());
        }

        updateIngredient(index:number, ing:Ingredient){
            this.ingredients[index] = ing;
            this.addNewClicked.next(this.ingredients.slice());
        }
        addingFromRecipe(ing:Ingredient[]){
            this.ingredients.push(...ing);
            this.addNewClicked.next(this.ingredients.slice());
        }
        deleteIngredient(index:number){
         this.ingredients.splice(index,1);
         this.addNewClicked.next(this.ingredients.slice());
        }

    
        
}