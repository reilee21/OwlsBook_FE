import React from 'react';
import Chart from 'react-apexcharts';

interface Series {
  title: string;
  data: number[];
}

interface MultiColsChartProps {
   xlabels: string[]
   data1: Series;
   data2: Series;
}

const demo = [
    "Top 1",
    "Top 2",
    "Top 3",
    "Top 4",
    "Top 5",
    "Top 6",
    "Top 7",
    "Top 8",
    "Top 9",
    "Top 10",
];

const names = demo.map(item => item.name);
const purchases = demo.map(item => item.purchases);
const stock = demo.map(item => item.stock);



const MultiColsChart: React.FC<MultiColsChartProps> = ({xlabels,data1,data2}) => {

  const options = {
    dataLabels: {
      enabled: false
    },
    colors: ['#29C3BE', '#5D62B5'],
    stroke: {
      width: [4, 4]
    },
 
    plotOptions: {
      bar: {
        columnWidth: "70%",
        borderRadius: 2,
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'last',
    }
    },
    xaxis: {
      categories: demo
    },
    yaxis: [
      {
        seriesName: data1.title,
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
        },
        title: {
          text: data1.title
        }
      },
      
      {
        opposite: true,
        seriesName: data2.title,
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
        },
        title: {
          text: data2.title
        }
      }
    ],
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        formatter: (val: number, { series, seriesIndex, dataPointIndex }: any) => {
            return ` ${val} : ${xlabels[dataPointIndex]}`;
        },
      },
      
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40
    }
  };

  const series = [
    {
      name: data1.title,
      type: 'bar',
      data: data1.data,
    },
   
    {
      name: data2.title,
      type: 'bar',
      data: data2.data
    },
  ];
  
  return (
    <div className="chart">
      <Chart options={options} series={series} type="bar"height={400}/>
    </div>
  );
};

export default MultiColsChart;
