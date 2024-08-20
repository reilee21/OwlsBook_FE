import { useEffect, useState } from "react"
import { GetLocationData } from "@/lib/location"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue,SelectItem } from "@/components/ui/select";



const Address = ({ct,dt,w,a,cityWidth,districtWidth,wardWidth,aWidth, setCT,setDT,setW,setAD,}) =>{
    const[locationData,setLocationData] = useState([]);
    const[districtData,setDistrictData] = useState([]);
    const[wardData,setWardData] = useState([]);
 
    useEffect(()=>{
        const getDT = async () => {
            const lc = await GetLocationData();            
            setLocationData(lc);
        };
        getDT();
    },[])

    useEffect(()=>{
        
        const initCT = () =>{
            if(ct){
                setCT(ct);
                updateDTdata(ct);
            
            }
        }
        const initDT = () =>{
            if(!dt) return;
            setDT(dt)
            const cityf = locationData.find((item) => item.Id === ct);
            if(cityf){
                var districtf = cityf.Districts.find((item)=>item.Id==dt);
                if(districtf){
                    setWardData(districtf.Wards)
                }
            }
            if(w){
                handleWardChange(w)
            }

        }
        initCT();
        initDT();
        if(a)
            setAD(a)            

        
    },[locationData])
    
    


    const handleCityChange = (value) => {
        setCT(value);
        updateDTdata(value);

    };
    const handleDistrictChange = (value) => {
        setDT(value)
        updateWdata(value);
    };
    const handleWardChange = (value) => {
        setW(value)
    };

    const updateDTdata = (cityId) =>{
        const city = locationData.find((item) => item.Id === cityId);
        if(city){
            setDistrictData(city.Districts);
            setWardData([]);
        }
    }
    const updateWdata = (districtId) =>{
        
        var district = districtData.find((item)=>item.Id==districtId);
        if(district){
           
            setWardData(district.Wards);
        }
    }

   
    return(
        <>
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-2 mt-2">
            <div className={" "+(cityWidth ? cityWidth : " " )}>
                <Label className="p-2">Tỉnh / Thành</Label>
                    <Select value={ct}  onValueChange={handleCityChange}>
                        <SelectTrigger className="w-full mt-2">
                            <SelectValue placeholder="Chọn Tỉnh / thành" />
                        </SelectTrigger>
                        <SelectContent>                  
                            {locationData && locationData.map((item,index)=>(
                                <SelectItem value={item.Id} key={'ct-'+index}>
                                    {item.Name}
                                </SelectItem>
                            ))}                  
                        </SelectContent>
                </Select>
            </div>
            <div className={" "+(districtWidth ? districtWidth : " " )}>
                <Label className="p-2">Quận / huyện</Label>
                <Select value={dt}  onValueChange={handleDistrictChange}>
                    <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Chọn Quận / huyện" />
                    </SelectTrigger>
                    <SelectContent>
                        {districtData && districtData.map((item,index)=>(
                            <SelectItem value={item.Id} key={'dt-'+index}>
                                {item.Name}
                            </SelectItem>
                        ))}                                   
                    </SelectContent>
                </Select>
            </div>
            <div className={" "+(wardWidth ? wardWidth : " " )}>
                <Label className="p-2">Phường / Xã</Label>
                <Select value={w}  onValueChange={handleWardChange}>
                    <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Chọn Phường / Xã" />
                    </SelectTrigger>
                    <SelectContent>
                        {wardData
                        && wardData.map((item,index)=>(
                            <SelectItem value={item.Id} key={'w-'+index}>
                                {item.Name}
                            </SelectItem>
                        ))
                        }                                   
                    </SelectContent>
                </Select>
            </div>
            <div className={" "+(aWidth ? aWidth : "col-span-4" )}>
                <Label className="p-2"> Địa chỉ</Label>
                <Input value={a}  onChange={(e)=>{setAD(e.target.value);setAD(e.target.value)}} className="w-full mt-2" type="text" placeholder="Nhập địa chỉ nhận hàng"/>
            </div>           
        </div>
            
        </>
    )
}
export default Address;