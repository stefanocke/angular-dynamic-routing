import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RoutesService {

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

                map(cfg => cfg.map(r => {
                    return {
                        path: r.path,
                        // For "real" dynamic module loading in a "Plugin-System" this would be SystemJS instead of WebPack Code-Splitting + import
                        loadChildren: () => import(`./${r.esModule}/${r.esModule}.module`).then(m => m[r.angularModule])
                    }
                }))
            )
            .subscribe(cfg => {
                router.resetConfig(cfg);
                // Fortunately, the router recoginzes that its config has changed.
                // So, no extra magic is necessary here to force a reload of the current route
                this.router.navigateByUrl(this.router.url);
            });

    }
}