import { Component } from '@angular/core';

import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent],
  template: ` <main>
  <header class="logohome">
    <img src="asset/home.png"  alt="logo" aria-hidden="true" style="width: 150px; hight:100px "/>
  </header>
  <section class="content">
      <app-home></app-home>
    </section>
</main> `
  
  ,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'homes';
}
