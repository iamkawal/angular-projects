import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { Recipe } from './recipes.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Delicious Cake',
      'A cake that is delicious',
      'https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/x17/16730-beckys-butter-cake-760x580.jpg?ext=.jpg',
      [new Ingredient('flour', 1), new Ingredient('sugar', 1)]
    ),
    new Recipe(
      'Rajma Chawal',
      'Chawal with rajma',
      'https://i.pinimg.com/originals/9c/a8/ae/9ca8aeee64b74f87b4fe5f743bce63e0.jpg',
      [new Ingredient('rice', 1), new Ingredient('rajma', 1)]
    ),
  ];

  constructor(private ShoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice(); // with .slice() we are returning a copy of recipes[] not a pointer to recipes[]
  }

  addRecipeIngredientsToShoppingList(recipe: Recipe) {
    recipe.ingredients.forEach((ingredient) => {
      this.ShoppingListService.addNewIngredient(ingredient);
    });
  }
}
