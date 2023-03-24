import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Libro } from '../interfaces/ILibro';
import { IRespLib } from '../interfaces/IRespLib';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'libro';
  vUrl: string = 'https://localhost:7053/libro/';

  constructor(private http: HttpClient) {
  }
  
  getLibro(): Observable<IRespLib> {    
    return this.http.get<IRespLib>(`${this.myAppUrl}${this.myApiUrl}`);
    //return this.http.get<IRespLib>(this.vUrl);
  }
    
  addLibro(libro: Libro): Observable<IRespLib> {
    return this.http.post<IRespLib>(`${this.myAppUrl}${this.myApiUrl}`, libro);
  }

  deleteLibro(id: number): Observable<IRespLib> {
    //console.log('sisas' + this.myAppUrl +this.myApiUrl + '/?=' + id);
    return this.http.delete<IRespLib>(this.myAppUrl +this.myApiUrl + '?vId=' + id);
  }

  getLiros(id: number): Observable<IRespLib> {
    //console.log('Por aqui pase ' + this.myAppUrl +this.myApiUrl + '/' + id)
    return this.http.get<IRespLib>(this.myAppUrl +this.myApiUrl + '/' + id);
  }

  updateLibro(vAutor: Libro): Observable<IRespLib> {
    return this.http.put<IRespLib>(`${this.myAppUrl}${this.myApiUrl}`, vAutor);
  }
  


}
