import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardGuard } from "src/app/auth/auth-guard.guard";
import { RecipeDetailComponent } from "../recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "../recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "../recipe-resolver";
import { RecipesComponent } from "../recipes.component";
import { StartNewComponent } from "./start-new.component";

const route:Routes = [
    {path : '', component : RecipesComponent,canActivate : [AuthGuardGuard] ,children:[
    {path: '', component: StartNewComponent},
    {path: 'new', component : RecipeEditComponent},
    {path: ':id', component : RecipeDetailComponent, resolve:[RecipeResolverService]},
    {path: ':id/edit', component : RecipeEditComponent,resolve:[RecipeResolverService]}
]}
]

@NgModule({
imports : [RouterModule.forChild(route)]
})

export class RecipeRoutingModule{

}