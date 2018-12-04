import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EndpointUrl } from '../shared/endpoints';
import { Match } from './match';

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

  getMatchById(id: number): Observable<any>{
    let url = `${EndpointUrl}/match/${id}`
    return this.http.get(url)
  }

  updateMatchDetails(match: Match): Observable<any>{
    let url = `${EndpointUrl}/match`;
    return this.http.put(url, match);
  }

}
