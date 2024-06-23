import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const importExportModule = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatMenuModule,
  HttpClientModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  DragDropModule,
  FormsModule,
  MatInputModule, 
  MatSnackBarModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...importExportModule],
  exports: [...importExportModule],
})
export class SharedModule {}
