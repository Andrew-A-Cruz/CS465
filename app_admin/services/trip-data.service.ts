import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Trip } from '../models/trip';

@Injectable()
export class TripDataService {

  constructor(private http: Http) { }

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

}
