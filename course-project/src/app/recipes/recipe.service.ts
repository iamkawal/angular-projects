import { EventEmitter } from '@angular/core';
import { Recipe } from './recipes.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Recipe 1',
      'test description 1',
      'https://thumbs.dreamstime.com/z/black-chickpea-chaat-kala-chana-chat-recipe-popular-snack-india-served-bowl-selective-focus-187517536.jpg'
    ),
    new Recipe(
      'Recipe 2',
      'test description 2',
      'https://thumbs.dreamstime.com/z/black-chickpea-chaat-kala-chana-chat-recipe-popular-snack-india-served-bowl-selective-focus-187517536.jpg'
    ),
  ];

  getRecipes() {
    return this.recipes.slice(); // with .slice() we are returning a copy of recipes[] not a pointer to recipes[]
  }
}
