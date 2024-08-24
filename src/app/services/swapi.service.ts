import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private http: HttpClient) { }

  getMovieList(): Observable<any> {
    return this.http.get(`https://swapi.dev/api/films`);
  }

  getAll(type: String): Observable<any[]> {
    return this.http.get<any>(`https://swapi.dev/api/${type}`).pipe(
      switchMap((response) => {
        const requests = [];
        for (let i = 0; i < Math.ceil((response.count / 10) - 1); i++) {
          requests.push(this.http.get<any>(`https://swapi.dev/api/${type}/?page=${Math.ceil((response.count / 10) - 1) - (i - 1)}`));
        }
        return forkJoin(requests).pipe(
          map((responses) => {
            let data = responses.flatMap((res) => res?.results)
            response.results.map((x: any) => data.push(x))
            return data
          })
        );
      })
    );
  }

  getPersonDetailsById(id: any): Observable<any> {
    return this.http.get<any>(`https://swapi.dev/api/people/${id}`)
  }
  getPlanetDetailsById(url: any): Observable<any> {
    return this.http.get<any>(`${url}`)
  }
  getDetailsById(url: any[]): Observable<any> {
    let requests = []
    for (let i = 0; i <= url.length - 1; i++) {
      requests.push(this.http.get<any>(`${url[i]}`))
    }
    return forkJoin(requests).pipe(
      map((responses) => responses)
    );
  }
}
