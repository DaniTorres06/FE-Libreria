import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Autor } from 'src/app/interfaces/IAutor';
import { AutorService } from 'src/app/services/autor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-autor',
  templateUrl: './add-edit-autor.component.html',
  styleUrls: ['./add-edit-autor.component.css']
})
export class AddEditAutorComponent implements OnInit {

  form: FormGroup;
  id: number;
  vArrAutor: Autor[]=[];

  constructor(
    private fb: FormBuilder,
    private _autorService: AutorService,
    
    private router: Router,    
    private aRoute: ActivatedRoute
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
      //this.operacion = 'Editar';
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
      //this.mensajeExito('registrada');
      //this.router.navigate(['/app-autor']);
      console.log(data);
    })
  }

  editarAutor(id: number, vAutor: Autor) {
    //this.loading = true;
    
    this._autorService.updateAutor(vAutor).subscribe(() => {
      //this.loading = false;
      //console.log('llegue')
      //this.mensajeExito('actualizada');
      this.router.navigate(['/app-autor']);
    })
    
   //console.log('Por aqui edtio');
  }
  

}
