
import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') editItemSet : NgForm;
  public subscribtion:Subscription;
  index : number;
  editMode = false;
  public ingredient: Ingredient;
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscribtion = this.shoppingListService.editClicked.subscribe((index:number)=>{
     this.index = index;
     this.editMode = true;
     this.ingredient = this.shoppingListService.getIngredientsByIndex(index);
     this.editItemSet.setValue({
       'ingName' : this.ingredient.name,
       'ingAmount' : this.ingredient.amount
     })
    })
  }
  OnAddClicked(form:NgForm){
   const value = form.value;
   const newOne = new Ingredient(value.ingName,value.ingAmount);
   if(this.editMode){
     this.shoppingListService.updateIngredient(this.index,newOne);
   }else{
    this.shoppingListService.addNew(newOne);
   }
   this.onClear();
  }
  onClear(){
    this.editItemSet.reset();
    this.editMode = false;
  }
  onDelete(){
    this.onClear();
    this.shoppingListService.deleteIngredient(this.index)
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
