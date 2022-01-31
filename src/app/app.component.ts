import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {ProductsService} from './datos.service';


export interface AgricompraElements {
  id: number;
  Nombre: string;
  Monto:number;
  Moneda: string;
  Estado: string;
}

const ELEMENT_DATA: AgricompraElements[] = [
  
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'apitable';
  public selectedOption:number = 0;
  data!:any;
  dataSource = new MatTableDataSource <AgricompraElements>(ELEMENT_DATA);
  displayedColumns: string[] = ['id','Nombre','Monto','Moneda','Estado'];

  constructor(private productSvc: ProductsService) { }

  onSelect(id:any):void{
      
      this.productSvc.getProducts(Number(id.target.value))
      .pipe(
        tap(res => {
          this.data = res.data;
          this.gridTable();
          
          this.dataSource._updateChangeSubscription();
        } )
      )
      .subscribe();
  }

  gridTable():void{
    this.dataSource.data.splice(0,this.dataSource.data.length);
    let estado = "";
    for(let d of this.data)
    {
    
      if(d.is_canceled)
       estado = "Cancelado";
      else
       estado = "Activo";
   

      if(String(d.currency) == 'USD')
         this.dataSource.data.push({id: d.id, Nombre: d.order.seller_store.name, Monto: d.total_usd, Moneda:d.currency, Estado:estado});
      else
         this.dataSource.data.push({id: d.id, Nombre: d.order.seller_store.name, Monto: d.total_mxn, Moneda:d.currency, Estado:estado});
    }

  }
}
