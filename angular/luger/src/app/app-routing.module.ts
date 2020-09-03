import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'browser/:ownerId', loadChildren: () => import('./modules/browser/browser.module').then(m => m.BrowserModule) },
  { path: 'editor/:itemId', loadChildren: () => import('./modules/editor/editor.module').then(m => m.EditorModule) },
  { path: '', redirectTo: 'browser/0', pathMatch: 'full' },
  { path: '**', redirectTo: 'browser/0', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
