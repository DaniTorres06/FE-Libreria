import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Autor } from '../interfaces/IAutor';
import { IRespLib } from '../interfaces/IRespLib';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'autores';
  vUrl: string = 'https://localhost:7053/autores/';

  constructor(private http: HttpClient) { 

  }
  
  getAutores(): Observable<IRespLib> {    
    return this.http.get<IRespLib>(`${this.myAppUrl}${this.myApiUrl}`);
    //return this.http.get<IRespLib>(this.vUrl);
  }


}
