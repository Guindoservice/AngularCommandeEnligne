import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';

import  {Housinglocation} from '../housinglocation';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
   <section>
      <form>
        <input type="text" placeholder="Recherche...." />
        <button class="primary" type="button">Recherche</button>
      </form>
    </section>
    
    <section class="results">
    <app-housing-location [housingLocation]="housingLocation"></app-housing-location>    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  //lien pour recuperer les images sur le site de angular
readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';

  housingLocation: Housinglocation = 
    { Id: 9999,
       name: 'Test hom', 
       city: 'Test city', 
       state: 'ST',
        photo: `${this.baseUrl}/example-house.jpg`,
         availableUnits: 90,
          wifi: true, 
          laundry: false
         };


}
