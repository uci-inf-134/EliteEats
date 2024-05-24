import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'pantry',
        loadChildren: () => import('../pantry/pantry.module').then(m => m.PantryPageModule)
      },
      {
        path: 'shopping',
        loadChildren: () => import('../shopping/shopping.module').then(m => m.ShoppingPageModule)
      },
      {
        path: 'expiration',
        loadChildren: () => import('../expiration/expiration.module').then(m => m.ExpirationPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
