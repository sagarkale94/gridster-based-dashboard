import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridsterModule } from 'angular-gridster2';
import { MatIconModule } from '@angular/material/icon';
import { FinalLayoutComponent } from './final-layout/final-layout.component';
import { PrepareLayoutComponent } from './prepare-layout/prepare-layout.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GraphComponent } from './graph/graph.component';
import { MatMenuModule } from '@angular/material/menu';
import { TileComponent } from './tile/tile.component';
import { MatSelectModule } from '@angular/material/select';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieCHartComponent } from './pie-chart/pie-chart.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GuageChartComponent } from './guage-chart/guage-chart.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    FinalLayoutComponent,
    PrepareLayoutComponent,
    GraphComponent,
    TileComponent,
    BarChartComponent,
    PieCHartComponent,
    GuageChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    FlexLayoutModule,
    GridsterModule,
    MatIconModule,
    DragDropModule,
    MatMenuModule,
    MatSelectModule,
    MatCardModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
