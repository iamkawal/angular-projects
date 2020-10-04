import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredients.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private ShoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.ShoppingListService.ingredients;
  }
}
