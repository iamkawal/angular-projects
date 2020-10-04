import { RecipeService } from './../../recipe.service';
import { Recipe } from './../../recipes.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private RecipeService: RecipeService) {}

  ngOnInit(): void {}

  onSelected() {
    this.RecipeService.recipeSelected.emit(this.recipe);
  }
}
