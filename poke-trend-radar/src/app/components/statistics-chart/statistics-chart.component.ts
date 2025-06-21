import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import type { EChartsOption } from 'echarts';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';
import { BarChart, LineChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent, GridComponent, TitleComponent, DatasetComponent, VisualMapContinuousComponent, DataZoomSliderComponent, DataZoomInsideComponent, LegendScrollComponent, VisualMapPiecewiseComponent, LegendPlainComponent, VisualMapComponent, PolarComponent, AxisPointerComponent, MarkPointComponent, GraphicComponent, SingleAxisComponent, CalendarComponent, GridSimpleComponent, ToolboxComponent } from 'echarts/components';

echarts.use([
  BarChart, TooltipComponent, LegendComponent, GridComponent, CanvasRenderer, LineChart, TitleComponent, DatasetComponent,
  VisualMapContinuousComponent, DataZoomSliderComponent, DataZoomInsideComponent, LegendScrollComponent, VisualMapPiecewiseComponent,
  LegendPlainComponent, VisualMapComponent, PolarComponent, AxisPointerComponent, MarkPointComponent, echarts.extendComponentModel,
  GraphicComponent, SingleAxisComponent, CalendarComponent, GridSimpleComponent, ToolboxComponent
]);

@Component({
  selector: 'app-statistics-chart',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, NgxEchartsModule],
  templateUrl: './statistics-chart.component.html',
  styleUrl: './statistics-chart.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useFactory: () => ({ echarts }),
    }
  ]
})
export class StatisticsChartComponent implements OnInit {

  options!: EChartsOption;
  isBrowser = false;
  xAxisData: any[];
  dataMinPrice: any[];
  dataTotalAvailability: any[];
  dataDetailedAvailability: any[];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.xAxisData = [];
    this.dataMinPrice = [];
    this.dataDetailedAvailability = [];
    this.dataTotalAvailability = []
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
