import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeServices } from '../recipe.services';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  public recipes: Array<Recipe> ;
  public subscribtion:Subscription;
  constructor(private recipeServices:RecipeServices) { }

  ngOnInit(): void {
    this.recipes = this.recipeServices.getRecipe();
    this.subscribtion = this.recipeServices.recipeChanged.subscribe((recipe:Recipe[])=>{
      this.recipes = recipe;
    })
    
  }

  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }
 
}
