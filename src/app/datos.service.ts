import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
  })

  export class ProductsService {
    private apiUrlAll = 'https://agricompra.com/v1/order_payment_payment/buy?offset=0&limit=50';
    private apiUrlCancel = 'https://agricompra.com/v1/order_payment_payment/buy?offset=0&limit=50&is_canceled=true';
    private apiUrl = 'https://agricompra.com/v1/order_payment_payment/buy?offset=0&limit=50&is_canceled=false';
    private url = "";
    constructor(private http: HttpClient) { }
  
    getProducts(filter:any):Observable<any>{
      switch(filter){
        case 1: this.url = this.apiUrlAll;
        break;
        case 2: this.url = this.apiUrlCancel;
        break;
        case 3: this.url = this.apiUrl;
        break;
      }
  
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + btoa('BROWSER:2b621848CE5C89dD4Bad976EcDCE66AD')
        })
      };
      return this.http.get(this.url, httpOptions);
      
    }
  }