import { Component } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { ChartModule, Chart } from 'angular-highcharts';
import { MatSelectModule } from '@angular/material/select';
import { LivraisonService, Livraison } from '../Services/livraison.service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-livraison',
  standalone: true,
  imports: [MatTableModule,CommonModule, ChartModule, MatSelectModule],
  templateUrl: './livraison.component.html',
  styleUrl: './livraison.component.css'
})
export class LivraisonComponent implements OnInit{

  displayedColumns: string[] = ['numeroCommande', 'date', 'nomClient', 'contactClient', 'totalCommande', 'option'];
  dataSource: Livraison[] = [];
  totalDeliveries = 0;
  ongoingDeliveries = 0;
  successfulDeliveries = 0;

  constructor(private livraisonService: LivraisonService) {}

  ngOnInit(): void {
    this.livraisonService.getLivraisons().subscribe((data) => {
      this.dataSource = data;
      this.totalDeliveries = data.length;
      this.ongoingDeliveries = data.filter(
        (d) => d.option === 'en cours'
      ).length;
      this.successfulDeliveries = data.filter(
        (d) => d.option === 'livré'
      ).length;
    });
  }

  lineChart= new Chart({
    chart: {
      type: 'line',
      style: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px'
      }
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      /*tickWidth: 0, // Supprime les ticks sur l'axe x
      lineWidth: 0, // Supprime la ligne de l'axe x*/
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },

    yAxis: {
      min: 0,
      max: 50,
      tickInterval: 10,
      
    },
   
    series: [
      {
        type: 'line',
        name: 'Jour de la sémaine',
        color: '#EE4D2D',
        data: [1, 2, 3, 4, 5, 6, 7]
      }
    ]
  })


}

const ELEMENT_DATA = [
  { numeroCommande: 1, date: '12/03/2023', nomClient: 'Bakary Samaké', contactClient: '80000090', totalCommande: '100000 F', option: 'livré' },
  { numeroCommande: 2, date: '01/03/2023', nomClient: 'Hamidou Diallo', contactClient: '80000091', totalCommande: '150000 F', option: 'en cours' },
  { numeroCommande: 3, date: '05/04/2023', nomClient: 'Aminata Coulibaly', contactClient: '80000092', totalCommande: '200000 F', option: 'expédié' },
  { numeroCommande: 4, date: '20/04/2023', nomClient: 'Seydou Keita', contactClient: '80000093', totalCommande: '250000 F', option: 'livré' },
  { numeroCommande: 5, date: '15/05/2023', nomClient: 'Fatoumata Diarra', contactClient: '80000094', totalCommande: '300000 F', option: 'en cours' }
];