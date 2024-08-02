import { Component, Input } from '@angular/core';
import { StatsI } from '../../interfaces/stats-i';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-card.component.html',
  styleUrl: './icon-card.component.css'
})
export class IconCardComponent {
  @Input() stat!: StatsI;
}
