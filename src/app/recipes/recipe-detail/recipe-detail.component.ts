import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeServices } from '../recipe.services';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
detailed:Recipe;
id:number;


  constructor(private recipeServices:RecipeServices,private route:ActivatedRoute,private router:Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((res:Params)=>{
      this.id = +res['id'];
      this.detailed = this.recipeServices.getRecipeById(this.id);
    })
  }
addShopList(){
this.recipeServices.addIngToShopList(this.detailed.ingredients);
}

// editRecipe(){
//   this.router.navigate(['edit'],{relativeTo:this.route});
// }

deleteRecipe(){
  this.recipeServices.deleteRecipe(this.id);
  this.router.navigate(['../'],{relativeTo:this.route});
}
}
