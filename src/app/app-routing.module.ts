import { SplashComponent } from './splash/splash.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes =
  [
    {path: '**', component: SplashComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { enableTracing: true } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
