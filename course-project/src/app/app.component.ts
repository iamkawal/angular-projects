import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Recipe maker';
  loadedFeature = 'recipes';

  onFeature(event: string): void {
    console.log('onFeature received an event:', event);
    this.loadedFeature = event;
  }
}
