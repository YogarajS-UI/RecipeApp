import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "../app-routing-module";
import { AppDropDown } from "../shared/dropdown.directive";
import { sharedModule } from "../shared/shared.module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeRoutingModule } from "./start-new/recipe-routing.module";

@NgModule({
    declarations: [
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    AppDropDown
    ],
    imports: [sharedModule,ReactiveFormsModule,RouterModule,RecipeRoutingModule],
    exports:[AppDropDown]
})

export class RecipesModule {

}