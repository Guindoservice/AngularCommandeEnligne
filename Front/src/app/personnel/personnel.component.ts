import { AfterViewInit, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
declare var $: any;
@Component({
  selector: 'app-personnel',
  standalone: true,
  imports: [MatIconModule, MatPaginator],
  templateUrl: './personnel.component.html',
  styleUrl: './personnel.component.css',
})
export class PersonnelComponent implements AfterViewInit {
  filterelement($event: Event) {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
}
