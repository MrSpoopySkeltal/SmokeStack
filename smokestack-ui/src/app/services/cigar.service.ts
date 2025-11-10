import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cigar {
  id?: number;
  name: string;
  brand: string;
  strength: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class CigarService {
  private baseUrl = 'http://localhost:3000/api/cigars';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cigar[]> {
    return this.http.get<Cigar[]>(this.baseUrl);
  }

  getById(id: number): Observable<Cigar> {
    return this.http.get<Cigar>(`${this.baseUrl}/${id}`);
  }

  create(cigar: Cigar): Observable<any> {
    return this.http.post(this.baseUrl, cigar);
  }

  update(id: number, cigar: Cigar): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, cigar);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
