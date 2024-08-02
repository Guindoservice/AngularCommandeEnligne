import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormGroup,FormBuilder,Validators,ReactiveFormsModule,} from '@angular/forms';
import { errorMessages, regExps } from '../../utils/form-validator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

export interface UserData {
  name: string;
  id: string;
  action: string;
}

@Component({
  selector: 'app-ajout-modife-produit',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule,ReactiveFormsModule],
  templateUrl: './ajout-modife-produit.component.html',
  styleUrl: './ajout-modife-produit.component.css',
})
export class AjoutModifeProduitComponent {
  action: string;
  local_data: UserData;
  countries!: string[];
  cancel: string = 'Cancel';

  tableForm!: FormGroup;
  error = errorMessages;

  constructor(
    public dialogRef: MatDialogRef<AjoutModifeProduitComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UserData,
    private formBuilder: FormBuilder
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.creatForm();
    this.tableForm.patchValue(this.local_data);
  }

  creatForm(): void {
    this.tableForm = this.formBuilder.group({
      country: ['', [Validators.required, Validators.pattern(regExps['str'])]],
      cases: ['', [Validators.required, Validators.pattern(regExps['num'])]],
      todayCases: [
        '',
        [Validators.required, Validators.pattern(regExps['num'])],
      ],
      deaths: ['', [Validators.required, Validators.pattern(regExps['num'])]],
      todayDeaths: [
        '',
        [Validators.required, Validators.pattern(regExps['num'])],
      ],
      recovered: [
        '',
        [Validators.required, Validators.pattern(regExps['num'])],
      ],
      active: ['', [Validators.required, Validators.pattern(regExps['num'])]],
    });
  }
  closeDialog() {
    this.dialogRef.close({ data: { action: 'Cancel' } });
  }

  onSubmit(): void {
    this.dialogRef.close({
      data: { action: this.action, data: this.tableForm.value },
    });
  }
}
