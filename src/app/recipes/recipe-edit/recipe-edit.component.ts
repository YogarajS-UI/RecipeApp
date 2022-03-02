import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeServices } from '../recipe.services';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm:FormGroup;
  id:number;
  editMode=false;
  recipe:Recipe;

  constructor(private route:ActivatedRoute,private recipeServices:RecipeServices,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  
  public  addIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[Validators.required,Validators.min(1)])
      })
    );
  }

  public addRecipe(){
    if(this.editMode){
      this.recipeServices.updateRecipe(this.id,this.recipeForm.value);
    }else{
      this.recipeServices.addRecipe(this.recipeForm.value)
    }
    this.onCancel();
  }

  onCancel(){
   this.router.navigate(['../'],{relativeTo:this.route});
  }

  private initForm(){
    let recipeName = '';
    let imgPath = '';
    let describtion = '';
    let recipeIngredient = new  FormArray([]);


    if(this.editMode){
      const recipe = this.recipeServices.getRecipeById(this.id);
      recipeName = recipe.name;
      imgPath = recipe.imagePath;
      describtion = recipe.describtion;
      if(recipe['ingredients']){
        for(let ing of recipe.ingredients){
          recipeIngredient.push(new FormGroup({
          'name' : new FormControl (ing.name,Validators.required),
          'amount' : new FormControl (ing.amount,[Validators.required,Validators.min(1)])
          }))
        }
      }
    }


    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName,Validators.required)  ,
      'imagePath' : new FormControl(imgPath,Validators.required),
      'describtion' : new FormControl(describtion,Validators.required),
      'ingredients' : recipeIngredient
    });
  }

  getcontrols() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onRemove(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit(){
    console.log(this.recipeForm);
  }

}
