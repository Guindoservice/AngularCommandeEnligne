import { Component, OnInit } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { IconCardComponent } from '../uiConponent/icon-card/icon-card.component';
import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { StatsI } from '../interfaces/stats-i';
import { ProductTileComponent } from '../uiConponent/product-tile/product-tile.component';
import { CommandeServiceService } from '../Services/commande-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [IconCardComponent, ProductTileComponent, CommonModule, NgFor, NgStyle, CanvasJSAngularChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

constructor(private commandeServiceService:CommandeServiceService) {
}

  ngOnInit(): void {
    //this.commandeServiceService.findAll().subscribe(data => {
      //console.log(data);

    //});;
  }

  chartOptions = {
    theme: "light2",
    height: 300,
		animationEnabled: true,
    data: [ {
      type: "spline",
      showInLegend: true,
      name: "Rapport",
      dataPoints: [
        { label: "Jan", y: 372 },
        { label: "Feb", y: 412 },
        { label: "Mar", y: 572 },
        { label: "Apr", y: 224 },
        { label: "May", y: 246 },
        { label: "Jun", y: 601 },
        { label: "Jul", y: 642 },
        { label: "Aug", y: 590 },
        { label: "Sep", y: 527 },
        { label: "Oct", y: 273 },
        { label: "Nov", y: 251 },
        { label: "Dec", y: 331 }
      ]
    }]
  };

  chartOption = {
	  animationEnabled: true,
	  title:{
		text: "Analyse"
	  },
    height: 300,
	  data: [{
		type: "doughnut",
		yValueFormatString: "#,###.##'%'",
		indexLabel: "{name}",
		dataPoints: [
		  { y: 28, name: "" },
		  { y: 10, name: "" },
		  { y: 20, name: "" },
		  { y: 15, name: "" },
		  { y: 23, name: "" },
		  { y: 17, name: "" },
		  { y: 12, name: "" }
		]
	  }]
	};

  statList: StatsI[] = [
    {
      nombre: 178,
      titre: "Commandes aux panier",
      icon: "fa-solid fa-heart",
      style: {
        'color': '#5B93FF',
        'font-size': '20px'
      },
      style_bg: {
        'background-color': '#5b92ff1e'
      }
    },
    {
      nombre: 2000,
      titre: "Commandes",
      icon: "fa-solid fa-heart",
      style: {
        'color': '#FFC327',
        'font-size': '20px'
      },
      style_bg: {
        'background-color': 'rgba(255, 187, 15, 0.15)'
      }
    },
    {
      nombre: 4900,
      titre: "Produits vendus",
      icon: "fa-solid fa-bag-shopping",
      style: {
        'color': '#FF8F6B',
        'font-size': '20px'
      },
      style_bg: {
        'background-color': '#ff906b21'
      }
    },
    {
      nombre: 1200,
      titre: "Utilisateurs",
      icon: "fa-solid fa-users",
      style: {
        'color': '#65558F',
        'font-size': '20px'
      },
      style_bg: {
        'background-color': '#65558f27'
      }
    }
  ];
}
