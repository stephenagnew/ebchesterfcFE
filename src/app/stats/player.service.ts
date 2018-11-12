import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EndpointUrl } from '../shared/endpoints';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  getPlayers():Observable<any>{
    let url = `${EndpointUrl}/players`
    return this.http.get(url)
  }

}
