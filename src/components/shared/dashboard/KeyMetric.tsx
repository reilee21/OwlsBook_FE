

'use client';
import { Card, CardContent } from '@/components/ui/card';


interface Props {
    label:string;
    value:any;
}

export default function KeyMetric({label = 'label',value ='value' }: Props) {
 

  return (
        <Card className='w-full text-center'>
            <CardContent>
                <div className='mt-2'>
                    <h5 className='text-gray-700'>
                        {label}
                    </h5>
                    <h5 className='font-semibold text-xl'>
                        {label.toLowerCase().includes('doanh thu') ? 
                            new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            }).format(value) 
                            : value.toString()
                        }
                    </h5>

                </div>
            </CardContent>
        </Card>
  );
}
