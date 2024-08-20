'use client';
import Chart from 'react-apexcharts';

interface Revenue {
  label: string;
  revenue: number;
}

interface Props {
  data: Revenue[];
  formatMoney?: boolean; 
  xaxis?: string[];
  chartType?: 'bar' | 'line';
}

export default function RevenueChart({ data, formatMoney = true, chartType = 'bar',xaxis }: Props) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(val);
  };

  const options = {
    chart: {
      id: 'basic-chart',
    },
    xaxis: {
      categories: (xaxis!== null && xaxis?.length > 0)? xaxis.map((item) => item) : data.map((item) => item.label),
    },
    yaxis: {
      labels: {
        formatter: (val: number) => {
          return formatMoney ? formatCurrency(val) : val.toString();
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => {
        return formatMoney ? formatCurrency(val) : val.toString();
      },
    },
    
    colors: ["#020617"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 2,
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    labels: {
      style: {
        colors: "#FFFFFF",
        fontSize: "16px",
        fontFamily: "inherit",
        fontWeight: 400,
      },
    },
    stroke: {
      curve: 'smooth',
    },
    tooltip: {
      y: {
        formatter: (val: number) => {
          return formatMoney ? formatCurrency(val) : val.toString();
        },
      },
    },
  };

  const series = [
    {
      name: '',
      data: data.map((item) => item.revenue),
    },
  ];

  return (
    <Chart options={options} series={series} type={chartType} />
  );
}
