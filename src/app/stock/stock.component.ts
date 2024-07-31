import { AfterViewInit, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
declare var $: any; // Déclaration pour utiliser jQuery dans Angular
@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [MatIconModule, MatPaginatorModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css',
})
export class StockComponent implements AfterViewInit {
  filterelement($event: Event) {
    throw new Error('Method not implemented.');
  }
  stcok: any;
  editStock(arg0: any) {
    throw new Error('Method not implemented.');
  }
  deleteStock(arg0: any) {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit() {}
}
