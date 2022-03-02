import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/dataStorage-service";
import { Recipe } from "./recipe.model";
import { RecipeServices } from "./recipe.services";

@Injectable({
    providedIn: 'root'
})

export class RecipeResolverService implements Resolve<Recipe[]>{

constructor (private dataStorage : DataStorageService, private recipe : RecipeServices){}


resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot ){
    const Recipes = this.recipe.getRecipe();
    if(Recipes){
        return Recipes;
    }
    else{
        return this.dataStorage.fetchRecipe();
    }
}
}

