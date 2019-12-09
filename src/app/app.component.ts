import { Component } from '@angular/core';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
} from '@angular/animations'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  

})
export class AppComponent {
  title = 'app';
  getRouteAnimation(outlet) {
      return outlet.activatedRouteData.animation
  }
  // Sets initial value to true to show loading spinner on first load
 
}