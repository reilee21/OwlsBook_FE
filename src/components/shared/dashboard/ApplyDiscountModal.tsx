'use client';
import { useEffect, useState } from "react";
import { DialogHeader, DialogTitle, Dialog, DialogContent, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useApplyDiscountOldBookMutation, useCreateDiscountMutation, useGetDiscountByNameQuery } from "@/services/discount/discountApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export default function ApplyDiscount({ updated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { data, isLoading } = useGetDiscountByNameQuery({ search });
  const [selectedDiscount, setSelectedDiscount] = useState('');
  const [selectedDiscountLabel, setSelectedDiscountLabel] = useState('');
  const [applydiscount ] = useApplyDiscountOldBookMutation();
  const {toast} = useToast();

  const handleSM = async (e: React.FormEvent) => {
    e.preventDefault();
    const disc = {
        discountId: Number.parseInt(selectedDiscount)
    }

    try{
       
         await applydiscount(disc).unwrap();
        toast({title:'Áp dụng thành công',variant:'success'})
        
    }catch(e){
        console.error(e)
        toast({title:'Có lỗi',variant:'destructive'})

    }
  };

  const handleCloseDialog = (e: boolean) => {
    setIsOpen(e);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSelectChange = (value: string) => {
    setSelectedDiscount(value);
    const selected = data.find((discount) => discount.discountId === parseInt(value));
    if (selected) {
      setSelectedDiscountLabel(`${selected.discountName} - ${selected.discountPercent}%`);
    }
  };



  return (
    <Dialog open={isOpen} onOpenChange={(e) => handleCloseDialog(e)}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Áp dụng khuyến mãi</Button>
      </DialogTrigger>
        
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Áp dụng khuyến mãi cho sách cũ </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSM}>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Tìm kiếm khuyến mãi "
              value={search}
              onChange={handleSearchChange}
              className="w-full"
            />
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn khuyến mãi">
                  {selectedDiscountLabel || "Chọn khuyến mãi"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {data && data.map((discount) => (
                    <SelectItem key={discount.discountId} value={discount.discountId.toString()}>
                      {discount.discountName} - {discount.discountPercent}%
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button className='mt-2' type="submit">Áp dụng</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
