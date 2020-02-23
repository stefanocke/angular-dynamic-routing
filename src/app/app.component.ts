import { Component } from '@angular/core';
import { RoutesService } from './routes.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-dynamic-routing';

  constructor(private routesService: RoutesService){
  }

  get routes() {
    return this.routesService.routes;
  }
}
