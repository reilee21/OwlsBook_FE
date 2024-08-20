'use client';
import { useGetSalesByCateQuery } from '@/services/analytics/Analytics';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

interface SalesSummary {
  label: string;
  revenue: number;
}

export default function TopCategorySalesChart() {
  const [data, setData] = useState<SalesSummary[]>([]);
  const { data: cates, isLoading,refetch } = useGetSalesByCateQuery();
  useEffect(()=>{refetch()},[])

  useEffect(() => {
    if (cates) setData(cates);
  }, [cates]);

  if (isLoading) {
    return <p>Loading...</p>;
  }


  const options = {
    chart: {
      id: 'category-sales-pie-chart',
    },
    labels: data.map((item) => item.label),
    legend: {
        position: 'right',
        horizontalAlign: 'center',
      labels: {
        colors: ['#000'],
        useSeriesColors: true,
      },
    },
    colors: ['#01204E', '#028391','#FFC947', '#DE834D','#6C0345', '#781D42'],
  };

  const series = data.map((item) => item.revenue);

  return (
    <>
      <div className='w-full flex flex-row mb-4'>
          <h5 className="font-semibold text-gray-700 w-full text-right">Doanh số theo danh mục</h5>
          <div className='w-full'>
         </div>
      </div>
      <Chart options={options} series={series} type="pie" />
      
    </>
  );
}
