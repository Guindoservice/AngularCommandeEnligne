import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-confirm-produit',
  standalone: true,
  imports: [],
  templateUrl: './confirm-produit.component.html',
  styleUrl: './confirm-produit.component.css'
})
export class ConfirmProduitComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    message: string,
    tittle:string,
  }, private mdDialogRef: MatDialogRef<ConfirmProduitComponent>) { }
  
  ngOnInit(): void{}
   /**
    * name
    */
   public cancel() {
     this.mdDialogRef.close(false);
   }
  /**
   * name
   */
  public confirm() {
    this.mdDialogRef.close(true);
  }
  
}
