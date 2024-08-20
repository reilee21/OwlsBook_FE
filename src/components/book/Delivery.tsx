import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { GetLocationData } from "@/lib/location";

export default function DeliveryEstimate({ deli, setDeli }) {
    const [locationData, setLocationData] = useState([]);
    const [districtData, setDistrictData] = useState([]);
    const [wardData, setWardData] = useState([]);

    const [label, setLabel] = useState({
        city: '',
        district: '',
        ward: ''
    });

    useEffect(() => {
        const getDT = async () => {
            const lc = await GetLocationData();
            setLocationData(lc);
        };
        getDT();
    }, []);

    useEffect(() => {
        if (deli.city) {
            const city = locationData.find(item => item.Id === deli.city);
            if (city) {
                setDistrictData(city.Districts);
                setLabel(prev => ({ ...prev, city: city.Name }));
            }
        }
    }, [deli.city, locationData]);

    useEffect(() => {
        if (deli.district) {
            const district = districtData.find(item => item.Id === deli.district);
            if (district) {
                setWardData(district.Wards);
                setLabel(prev => ({ ...prev, district: district.Name }));
            }
        }
    }, [deli.district, districtData]);
    useEffect(() => {
        if (deli.ward) {
            const ward = wardData.find(item => item.Id === deli.ward);
            if (ward) {
                setLabel(prev => ({ ...prev, ward: ward.Name }));
            }
        }
    }, [deli.ward, wardData]);
    const handleCityChange = (value) => {
        const selectedCity = locationData.find(item => item.Id === value);
        setDeli(prev => ({ ...prev, city: selectedCity.Id, district: '', ward: '' }));
        setLabel(prev => ({ ...prev, city: selectedCity.Name, district: '', ward: '' }));
        setDistrictData(selectedCity.Districts);
        setWardData([]);
    };

    const handleDistrictChange = (value) => {
        const selectedDistrict = districtData.find(item => item.Id === value);
        setDeli(prev => ({ ...prev, district: selectedDistrict.Id, ward: '' }));
        setLabel(prev => ({ ...prev, district: selectedDistrict.Name, ward: '' }));
        setWardData(selectedDistrict.Wards);
    };

    const handleWardChange = (value) => {
        const selectedWard = wardData.find(item => item.Id === value);
        setDeli(prev => ({ ...prev, ward: selectedWard.Id }));
        setLabel(prev => ({ ...prev, ward: selectedWard.Name }));
    };



    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <div className=" py-2 w-full hover:underline underline-offset-2 cursor-pointer">
                        {label.ward ? `${label.ward}, ` : ''}{label.district ? `${label.district}, ` : ''}{label.city}
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] lg:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Địa chỉ giao hàng</DialogTitle>
                    </DialogHeader>
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-2 mt-2">
                        <div className="">
                            <Label className="p-2">Tỉnh / Thành</Label>
                            <Select value={deli.city} onValueChange={handleCityChange}>
                                <SelectTrigger className="w-full mt-2">
                                    <SelectValue placeholder="Chọn Tỉnh / thành" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locationData && locationData.map((item, index) => (
                                        <SelectItem value={item.Id} key={'ct-' + index}>
                                            {item.Name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="p-2">Quận / huyện</Label>
                            <Select value={deli.district} onValueChange={handleDistrictChange}>
                                <SelectTrigger className="w-full mt-2">
                                    <SelectValue placeholder="Chọn Quận / huyện" />
                                </SelectTrigger>
                                <SelectContent>
                                    {districtData && districtData.map((item, index) => (
                                        <SelectItem value={item.Id} key={'dt-' + index}>
                                            {item.Name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="p-2">Phường / Xã</Label>
                            <Select value={deli.ward} onValueChange={handleWardChange}>
                                <SelectTrigger className="w-full mt-2">
                                    <SelectValue placeholder="Chọn Phường / Xã" />
                                </SelectTrigger>
                                <SelectContent>
                                    {wardData && wardData.map((item, index) => (
                                        <SelectItem value={item.Id} key={'w-' + index}>
                                            {item.Name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
