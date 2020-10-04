import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Mangoes', 5),
  ];

  addNewIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
