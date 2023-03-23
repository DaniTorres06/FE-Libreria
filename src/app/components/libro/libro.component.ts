import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { LibroService } from 'src/app/services/libro.services'
import { MatTableDataSource } from '@angular/material/table';
import { Libro } from 'src/app/interfaces/ILibro';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {

  vArrlibro: Libro[]=[];
  displayedColumns: string[] = ['id', 'titulo', 'anoPublicacion', 'genero', 'numPaginas', 'autor','acciones','volverAutor'];  
  dataSource = new MatTableDataSource<Libro>();

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _libroService: LibroService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.obtenerLibros();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por pagina'
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBar() {
    this._snackBar.open('Cannonball!!', 'Splash', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  obtenerLibros()
  {
    //this.loading = true;

    this._libroService.getLibro().subscribe((prueba) => {
      //this.vArrAutor = <Autor[]>prueba.objData
      //this.loading = false;
      this.dataSource.data = prueba.objData;
      console.log(prueba.objData);
      //console.log('Todo el objeto' , prueba)
      
    })
  }

  eliminarLibro(id: number) {
    //this.loading = true;

    this._libroService.deleteLibro(id).subscribe(() => {      
     //this.mensajeExito();
     //this.loading = false;
     this.obtenerLibros();
     this._snackBar.open('Libro eliminado','',{
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
    });    
  }

}
