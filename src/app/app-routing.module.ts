import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AutorComponent } from './components/autor/autor.component';
import { AddEditAutorComponent } from './components/add-edit-autor/add-edit-autor.component';
import { LibroComponent } from './components/libro/libro.component';
import { AddEditLibroComponent } from './components/add-edit-libro/add-edit-libro.component';


const routes: Routes = [
  { path:'', redirectTo: 'app-autor', pathMatch: 'full'},
  
  { path: 'app-autor', component: AutorComponent},
  { path: 'agregarAutor', component: AddEditAutorComponent},
  { path: 'editarAutor/:id', component: AddEditAutorComponent},

  { path: 'app-libro', component: LibroComponent},
  { path: 'agregarLibro', component: AddEditLibroComponent},
  { path: 'editarLibro/:id', component: AddEditLibroComponent},
  
  { path:'**', redirectTo: 'app-autor', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }