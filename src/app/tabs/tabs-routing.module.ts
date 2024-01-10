import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'products',
        loadChildren: () => import('../products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'data',
        loadChildren: () => import('../data/data.module').then(m => m.DataModule)
      },
      {
        path: 'logs',
        loadChildren: () => import('../logs/logs.module').then(m => m.LogsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/products',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
