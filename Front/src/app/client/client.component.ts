import { AfterViewInit, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
declare var $: any;
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [MatIconModule, MatPaginator],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements AfterViewInit {
  client: any;
  deleteClient(arg0: any) {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  filterelement($event: Event) {
    throw new Error('Method not implemented.');
  }
}
