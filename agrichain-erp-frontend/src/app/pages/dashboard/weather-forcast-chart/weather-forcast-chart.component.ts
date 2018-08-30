import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-weather-forcast-chart',
  template: `
    <div echarts [options]="options" style="height: 200px" class="echart height_initial"></div>
  `,
  styleUrls: ['./weather-forcast-chart.component.scss'],
})
export class WeatherForcastChartComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;
      // console.log( echarts );

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.success, colors.info],
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross',
          },
        },
        // legend: {
        //   data: ['2015 Precipitation', '2016 Precipitation'],
        //   textStyle: {
        //     color: echarts.textColor,
        //   },
        // },
        grid: {
          height: '150px',
          // top: 70,
          // bottom: 50,
        },
        xAxis: [
          {
            // show : false,
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors.info,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
            axisPointer: {
              label: {
                formatter: params => {
                  return (
                    'Precipitation  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                  );
                },
              },
            },
            data: [
              '2016-1',
              '2016-2',
              '2016-3',
              '2016-4',
              '2016-5',
            ],
          },
          {
            // show : false,
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors.success,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
            axisPointer: {
              label: {
                formatter: params => {
                  return (
                    'Precipitation  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                  );
                },
              },
            },
            data: [
              '2015-1',
              '2015-2',
              '2015-3',
              '2015-4',
              '2015-5',
            ],
          },
        ],
        yAxis: [
          {
            // show : false,
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: '2015 Precipitation',
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            data: [2.6, 5.9, 9.0, 26.4, 28.7],
          },
          // {
          //   name: '2016 Precipitation',
          //   type: 'line',
          //   smooth: true,
          //   data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7],
          // },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
