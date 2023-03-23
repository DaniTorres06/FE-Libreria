import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Libro } from 'src/app/interfaces/ILibro';
import { LibroService } from 'src/app/services/libro.services';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-libro',
  templateUrl: './add-edit-libro.component.html',
  styleUrls: ['./add-edit-libro.component.css']
})
export class AddEditLibroComponent implements OnInit {

  form: FormGroup;
  id: number;
  vArrLibro: Libro[]=[];
  vOperacion: string = 'Agregar';

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder,
    private _libroService: LibroService,
    
    private router: Router,    
    private aRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      anoPublicacion: ['', Validators.required],
      genero: ['', Validators.required],
      numPaginas: ['', Validators.required],
      autor: ['', Validators.required]
    })
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    
    if(this.id != 0) {
      this.vOperacion = 'Editar';
      this.obtenerLibro(this.id)
      console.log('Dani');
      
    }
  }

  obtenerLibro(id: number) {
    //this.loading = true;    
    this._libroService.getLiros(id).subscribe((data) => {      
      
      this.form.setValue({
        titulo: data.objData.titulo,
        anoPublicacion: data.objData.anoPublicacion,
        genero: data.objData.genero,
        numPaginas: data.objData.numPaginas,
        autor: data.objData.autor
      })   
      
      //this.loading = false;
    })
  }

  agregarEditarLibro(){  
    // Armamos el objeto
    const vObjLibro: Libro = {
      titulo: this.form.value.titulo,
      anoPublicacion: this.form.value.anoPublicacion,
      genero: this.form.value.genero,
      numPaginas: this.form.value.numPaginas,
      autor: this.form.value.autor
    }
    
    if(this.id != 0) {
      vObjLibro.id = this.id;
      this.editarLibro(this.id, vObjLibro);
    } else {
      this.agregarLibro(vObjLibro);      
    }
    
}

agregarLibro(vLibro: Libro) {
  this._libroService.addLibro(vLibro).subscribe(data => {      
    this.router.navigate(['/app-libro']);
    //console.log(data);
    this._snackBar.open('Libro agregado a la lista','',{
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  });
  
}

editarLibro(id: number, vLibro: Libro) {
  //this.loading = true;
  
  this._libroService.updateLibro(vLibro).subscribe(() => {      
    this.router.navigate(['/app-libro']);
    this._snackBar.open('Libro editado','',{
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  })
}

}
