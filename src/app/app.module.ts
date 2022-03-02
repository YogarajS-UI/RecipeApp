import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingListService } from './shopping-list/shoppingList.service';
import { AppRoutingModule } from './app-routing-module';
import { StartNewComponent } from './recipes/start-new/start-new.component';
import { RecipeServices } from './recipes/recipe.services';
import {HttpClientModule, HTTP_INTERCEPTORS}  from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoaderComponent } from './loader/loader.component';
import { AuthInterceptorServiceInterceptor } from './auth/auth-interceptor-service.interceptor';
import { RecipesModule } from './recipes/recipes.module';
// import { ShoppingListModule } from './shopping-list/shopping-list-module';
import { sharedModule } from './shared/shared.module';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StartNewComponent,
    AuthComponent,
    LoaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RecipesModule,
    // ShoppingListModule,
    sharedModule
 
  ],
  providers: [ShoppingListService, RecipeServices,{provide: HTTP_INTERCEPTORS,useClass:AuthInterceptorServiceInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
