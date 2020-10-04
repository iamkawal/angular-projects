import { RecipeService } from './../recipe.service';
import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Recipe } from './../recipes.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private RecipeService: RecipeService) {}

  ngOnInit(): void {}

  addRecipeIngredientsToShoppingList() {
    this.RecipeService.addRecipeIngredientsToShoppingList(this.recipe);
  }
}
