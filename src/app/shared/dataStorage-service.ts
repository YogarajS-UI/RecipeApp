import { Injectable } from "@angular/core";
import {HttpClient}  from '@angular/common/http';
import { RecipeServices } from "../recipes/recipe.services";
import { Recipe } from "../recipes/recipe.model";
import {map, tap} from "rxjs/operators"


@Injectable({
    providedIn:'root'
})
export class DataStorageService{
   constructor(private http:HttpClient, private recipe :RecipeServices){} 

   saveRecipe(){
       const recipe = this.recipe.getRecipe();
       this.http.put('https://recipe-d4de9-default-rtdb.firebaseio.com/Recipe.json',recipe)
       .subscribe(res => {
         console.log(res);
       })
   }

   fetchRecipe(){
       return this.http.get<Recipe []>('https://recipe-d4de9-default-rtdb.firebaseio.com/Recipe.json')
       .pipe(
        map(res => {
          if(res){
         return res?.map(res => {
           return {...res, ingredients : res.ingredients ? res.ingredients : []
           }
         }
          
          )
        }
       }),
      
       tap(res => {
         if(res)
          this.recipe.setRecipe(res);
       })
       );
       
      
   }
}