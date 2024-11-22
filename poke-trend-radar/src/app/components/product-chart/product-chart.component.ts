import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BarChart, LineChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent, GridComponent, TitleComponent, DatasetComponent, VisualMapContinuousComponent, DataZoomSliderComponent, DataZoomInsideComponent, LegendScrollComponent, VisualMapPiecewiseComponent, LegendPlainComponent, VisualMapComponent, PolarComponent, AxisPointerComponent, MarkPointComponent, GraphicComponent, SingleAxisComponent, CalendarComponent, GridSimpleComponent, ToolboxComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsOption } from 'echarts';
import { ProductDetail } from '../../services/product-manager.service';

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
    }
  ]
})
export class ProductChartComponent implements OnInit {
  @Input('productDetails') productDetails?: ProductDetail;

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
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.productDetails != undefined) {
      console.log(this.productDetails)
      this.productDetails.historical_scrape_data.forEach(scrape => {
        const date = new Date(scrape.scrape_date);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        const formattedDate = `${day}/${month}/${year}`;
        this.xAxisData.push(formattedDate);
        this.dataMinPrice.push(scrape.min_price);
        this.dataDetailedAvailability.push(scrape.detailed_availability);
        this.dataTotalAvailability.push(scrape.total_availability);
      });

      this.options = {
        legend: {
          data: ['MinPrice', 'AvailabilityByLang', 'TotalAvailability'],
          selected: {
            'TotalAvailability': false
          },
          align: 'left',
          backgroundColor: 'white',
          padding: [7, 50, 7, 50],
          borderRadius: 25,
          lineStyle: {
            type: 'dotted'
          },
          itemGap: 20,
          textStyle: {
            color: 'black',
            backgroundColor: 'white'
          }
        },
        grid: {
          left: '5%',
          right: '6%',
          bottom: '5%',
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        xAxis: {
          data: this.xAxisData,
          axisLabel: {
            color: 'white'
          },
          silent: false,
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          axisLabel: {
            color: 'white'
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: 'MinPrice',
            type: 'line',
            data: this.dataMinPrice,
            animationDelay: idx => idx * 10,
            showSymbol: false,
          },
          {
            name: 'AvailabilityByLang',
            type: 'line',
            data: this.dataDetailedAvailability,
            animationDelay: idx => idx * 10 + 100,
            showSymbol: false,
          },
          {
            name: 'TotalAvailability',
            type: 'line',
            data: this.dataTotalAvailability,
            animationDelay: idx => idx * 10 + 100,
            showSymbol: false,
            select: {
              disabled: true,

            }
          },
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: idx => idx * 5,
      };
    }
  }

}
