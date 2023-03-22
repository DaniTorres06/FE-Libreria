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

  addAutor(autor: Autor): Observable<Autor> {
    return this.http.post<Autor>(`${this.myAppUrl}${this.myApiUrl}`, autor);
  }

  deleteAutor(id: number): Observable<void> {
    //console.log('sisas' + this.myAppUrl +this.myApiUrl + '/?=' + id);
    return this.http.delete<void>(this.myAppUrl +this.myApiUrl + '?vId=' + id);
  }

  getAutor(id: number): Observable<IRespLib> {
    //console.log('Por aqui pase ' + this.myAppUrl +this.myApiUrl + '/' + id)
    return this.http.get<IRespLib>(this.myAppUrl +this.myApiUrl + '/' + id);
  }

  updateAutor(vAutor: Autor): Observable<Autor> {
    return this.http.put<Autor>(`${this.myAppUrl}${this.myApiUrl}`, vAutor);
  }


}
