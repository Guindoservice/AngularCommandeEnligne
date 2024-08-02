import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-loyaut',
  standalone: true,
    imports: [
        MatButton,
        MatDrawer,
        MatDrawerContainer,
        MatDrawerContent,
        MatIcon,
        MatIconButton,
        MatListItem,
        MatNavList,
        MatToolbar,
        RouterLink,
        RouterOutlet
    ],
  templateUrl: './loyaut.component.html',
  styleUrl: './loyaut.component.css'
})
export class LoyautComponent {

}
