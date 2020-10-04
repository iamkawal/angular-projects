import { RecipeService } from './recipe.service';
import { Recipe } from './recipes.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService],
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private RecipeService: RecipeService) {}

  ngOnInit(): void {
    this.RecipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }
}
