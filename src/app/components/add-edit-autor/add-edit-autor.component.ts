import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Autor } from 'src/app/interfaces/IAutor';
import { AutorService } from 'src/app/services/autor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-autor',
  templateUrl: './add-edit-autor.component.html',
  styleUrls: ['./add-edit-autor.component.css']
})
export class AddEditAutorComponent implements OnInit {

  form: FormGroup;
  id: number;
  vArrAutor: Autor[]=[];
  vOperacion: string = 'Agregar';

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder,
    private _autorService: AutorService,
    
    private router: Router,    
    private aRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombreCompleto: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      ciudadProcedencia: ['', Validators.required],
      correo: ['', Validators.required]      
    })
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {

    if(this.id != 0) {
      this.vOperacion = 'Editar';
      this.obtenerAutor(this.id)
      console.log('Dani');
      
    }
  }

  obtenerAutor(id: number) {
    //this.loading = true;    
    this._autorService.getAutor(id).subscribe((data) => {      
      
      this.form.setValue({
        nombreCompleto: data.objData.nombreCompleto,
        fechaNacimiento: data.objData.fechaNacimiento,
        ciudadProcedencia: data.objData.ciudadProcedencia,
        correo: data.objData.correo
      })   
      
      //this.loading = false;
    })
  }
    
  agregarEditarAutor(){  
      // Armamos el objeto
      const vObjAutor: Autor = {
        nombreCompleto: this.form.value.nombreCompleto,
        fechaNacimiento: this.form.value.fechaNacimiento,
        ciudadProcedencia: this.form.value.ciudadProcedencia,
        correo: this.form.value.correo
      }
      
      if(this.id != 0) {
        vObjAutor.id = this.id;
        this.editarAutor(this.id, vObjAutor);
      } else {
        this.agregarAutor(vObjAutor);      
      }
      
  }

  agregarAutor(vAutor: Autor) {
    this._autorService.addAutor(vAutor).subscribe(data => {      
      this.router.navigate(['/app-autor']);
      //console.log(data);
      this._snackBar.open('Autor agregado a la lista','',{
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    })
  }

  editarAutor(id: number, vAutor: Autor) {
    //this.loading = true;
    
    this._autorService.updateAutor(vAutor).subscribe(() => {      
      this.router.navigate(['/app-autor']);
      this._snackBar.open('Autor editado','',{
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'

      });
    })
  }
}
