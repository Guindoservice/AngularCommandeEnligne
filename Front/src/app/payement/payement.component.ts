import { AfterViewInit, Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
declare var $: any; 
@Component({
  selector: 'app-payement',
  standalone: true,
  imports: [
    MatIcon,
    MatPaginator
  ],
  templateUrl: './payement.component.html',
  styleUrl: './payement.component.css'
})
export class PayementComponent implements AfterViewInit {
filterelement($event: Event) {
throw new Error('Method not implemented.');
}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  
  
}
