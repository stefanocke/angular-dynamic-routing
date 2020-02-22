import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-dynamic-routing';

  routes = of([{
    path: 'customers', name: 'Customers', esModule: 'customers', angularModule: 'CustomersModule'
  },
  {
    path: 'products', name: 'Products', esModule: 'products', angularModule: 'ProductsModule'
  },
  {
    path: 'orders', name: 'Orders', esModule: 'orders', angularModule: 'OrdersModule'
  }]).pipe(
    delay(1000)
  );

  constructor(public router: Router) {
    this.routes
      .pipe(
        //For "real" dynamic module loading in a "Plugin-System" this would be SystemJS instead of WebPack Code-Splitting + import
        map(cfg => cfg.map(r => { return { path: r.path, loadChildren: () => import(`./${r.esModule}/${r.esModule}.module`).then(m => m[r.angularModule]) } }))
      )
      .subscribe(cfg => { router.resetConfig(cfg); this.reloadCurrentRoute() });

  }

  //Really?
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
