import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

// Import required ECharts modules
import { BarChart, LineChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent, GridComponent, TitleComponent, DatasetComponent, VisualMapContinuousComponent, DataZoomSliderComponent, DataZoomInsideComponent, LegendScrollComponent, VisualMapPiecewiseComponent, LegendPlainComponent, VisualMapComponent, PolarComponent, AxisPointerComponent, MarkPointComponent, GraphicComponent, SingleAxisComponent, CalendarComponent, GridSimpleComponent, ToolboxComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsOption } from 'echarts';

echarts.use([
  BarChart, TooltipComponent, LegendComponent, GridComponent, CanvasRenderer, LineChart, TitleComponent, DatasetComponent,
  VisualMapContinuousComponent, DataZoomSliderComponent, DataZoomInsideComponent, LegendScrollComponent, VisualMapPiecewiseComponent,
  LegendPlainComponent, VisualMapComponent, PolarComponent, AxisPointerComponent, MarkPointComponent, echarts.extendComponentModel,
  GraphicComponent, SingleAxisComponent, CalendarComponent, GridSimpleComponent, ToolboxComponent
]);

@Component({
  selector: 'app-product-chart',
  standalone: true,
  imports: [NgxEchartsModule, CommonModule],
  templateUrl: './product-chart.component.html',
  styleUrl: './product-chart.component.scss',
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useFactory: () => ({ echarts }),
    },
  ],
})
export class ProductChartComponent implements OnInit {
  @Input('title') title?: string;

  options!: EChartsOption;
  isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {
        trigger: 'axis',

        axisPointer: {
          animation: false,
        },
      },
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: 'bar',
          type: 'line',
          data: data1,
          animationDelay: idx => idx * 10,
          showSymbol: false,
        },
        {
          name: 'bar2',
          type: 'line',
          data: data2,
          animationDelay: idx => idx * 10 + 100,
          showSymbol: false,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: idx => idx * 5,
    };
  }



}


// formatter: (params: any) => {
//   const date = new Date(params[0].name);
//   return (
//     date.getDate() +
//     '/' +
//     (date.getMonth() + 1) +
//     '/' +
//     date.getFullYear() +
//     ' : ' +
//     params[0].value[1]
//   );
// },