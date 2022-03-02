import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit,OnDestroy {
 public ingredients: Array<Ingredient> ;
 public subscribe : Subscription;

  constructor(private shoppingListService:ShoppingListService) { }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  ngOnInit(): void {
   this.ingredients = this.shoppingListService.getIngredients();
   this.subscribe = this.shoppingListService.addNewClicked
   .subscribe((ing:Ingredient[]) =>{
    this.ingredients = ing;
   }
   );
  }
  onEdit(index:number){
   this.shoppingListService.editClicked.next(index);
  }

}
