import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EndpointUrl } from '../shared/endpoints';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(private http: HttpClient) { }

  getResults():Observable<any>{
    let url = `${EndpointUrl}/match/results`
    return this.http.get(url)
  }

  getFixtures(): Observable<any>{
    let url = `${EndpointUrl}/match/fixtures`
    return this.http.get(url)
  }


}
