import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Trip } from '../models/trip';
import { User } from '../../app_api/database/models/user';
import { AuthResponse } from 'src/app/authresponse';
import { BROWSER_STORAGE } from 'src/app/storage';

@Injectable()
export class TripDataService {

  constructor(private http: Http,
    @Inject(BROWSER_STORAGE) private storage: Storage) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  public getTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#addTrip');
    return this.http
      .get(this.tripUrl + tripCode)
      .toPromise()
      .then(response => response.json() as Trip)
      .catch(this.handleError);
  }

  public updateTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#updateTrip');
    console.log(formData);
    return this.http
      .put(this.tripUrl + formData.code, formData)
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.http
      .get(`${this.apiBaseUrl}trips`)
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }
  public addTrip(fromData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#ADDTrip');
    return this.http
      .post(`${this.apiBaseUrl}trips`, fromData)
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('something has gone wrong', error); //for demo purposes only
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
   }
   
   private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
 const url: string = `${this.apiBaseUrl}/${urlPath}`;
 return this.http
 .post(url, user)
 .toPromise()
 .then(response => response.json() as AuthResponse)
 .catch(this.handleError);
}
}
