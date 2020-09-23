import { Recipe } from './../../recipes.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeName: string;
  @Input() recipeDescription: string;
  @Input() recipeImageURL: string;

  @Input() recipe: Recipe;

  constructor() {}

  ngOnInit(): void {}
}
