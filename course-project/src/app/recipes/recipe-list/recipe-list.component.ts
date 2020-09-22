import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Recipe 1',
      'test description',
      'https://thumbs.dreamstime.com/z/black-chickpea-chaat-kala-chana-chat-recipe-popular-snack-india-served-bowl-selective-focus-187517536.jpg'
    ),
    new Recipe(
      'Recipe 1',
      'test description',
      'https://thumbs.dreamstime.com/z/black-chickpea-chaat-kala-chana-chat-recipe-popular-snack-india-served-bowl-selective-focus-187517536.jpg'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}
}
