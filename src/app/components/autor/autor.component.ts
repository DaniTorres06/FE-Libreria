import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AutorService } from 'src/app/services/autor.service'
import { MatTableDataSource } from '@angular/material/table';
import { Autor } from 'src/app/interfaces/IAutor';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {

  
  vArrAutor: Autor[]=[];
  displayedColumns: string[] = ['id', 'nombreCompleto', 'fechaNacimiento', 'ciudadProcedencia', 'correo', 'acciones'];  
  dataSource = new MatTableDataSource<Autor>();
  
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  //constructor()
  constructor( 
    private _autorService: AutorService
    
    )
    {  
      
    }

  ngOnInit(): void {    
    this.obtenerAutores();    
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

  obtenerAutores()
  {
    this.loading = true;

    this._autorService.getAutores().subscribe((prueba) => {
      //this.vArrAutor = <Autor[]>prueba.objData
      this.loading = false;
      this.dataSource.data = prueba.objData;
      console.log(prueba.objData);
      //console.log('Todo el objeto' , prueba)
      
    })
  }

  eliminarAutor(id: number) {
    this.loading = true;

    this._autorService.deleteAutor(id).subscribe(() => {      
     //this.mensajeExito();
     //this.loading = false;
     this.obtenerAutores();
    });    
  }
  

}
