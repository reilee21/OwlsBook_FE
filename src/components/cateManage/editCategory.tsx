import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle, Dialog, DialogContent, DialogTrigger, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useToast } from "../ui/use-toast";
import { useCreateCategoryMutation,  useDeleteCategoryMutation,  useEditCategoryMutation,  useGetAllCatesQuery } from "@/services/cate/CateApi";






interface CategoryEdit {
    categoryId :number;
    categoryName: string;
    parentCategoryName?: string;
    parentCategory?:number;
    parentCategoryNavigation?: any;
}

interface EditCategoryProps {
    category: CategoryEdit;
    isOpen:boolean;
    onClose: () => void;
    update: () => void;
}
export default function EditCategory({ category,isOpen, onClose, update }: EditCategoryProps) {
    const [newCate, setNewCate] = useState<CategoryEdit>(category);
    const { toast } = useToast();
    const { data: categories = [] } = useGetAllCatesQuery();
    const [updateCate] = useEditCategoryMutation();
    const [deleteCate] = useDeleteCategoryMutation();
    useEffect(()=>{
        if(category) {
            const init = {
                categoryId:category.categoryId,
                categoryName:category.categoryName,
                parentCategoryName: category.parentCategory ? category.parentCategoryNavigation.categoryName : ''
            }
            setNewCate(init)
        }
    },[category])
    useEffect(()=>{
        if(!isOpen){
            setNewCate(null)
        }
    },[isOpen])
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewCate((pre) => ({
            ...pre,
            [name]: value
        }));
    };
    const handleSelectChange = (value: string) => {
        setNewCate((prevCategory) => ({
            ...prevCategory,
            parentCategoryName: value ? value : undefined
        }));
    };
    const handleSM = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            var rs =  await updateCate(newCate).unwrap(); 
            if(rs && rs.code){
             toast({ title: "Cập nhật danh mục thất bại",description:rs.message, variant: "destructive" });
 
            }else{
             toast({ description: "Cập nhật danh mục thành công." ,variant:"success"});
             update();
             onClose();
            }
            
         } catch (error) {
             toast({ description: "Failed to update category.", variant: "destructive" });
         }
        
    }
    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            var rs =  await deleteCate({id:newCate.categoryId}); 
            if(rs ){
                toast({ description: "Xoá  danh mục thành công." ,variant:"success"});
                update();
                onClose();
            }
            
         } catch (error) {
             toast({ description: "Xoá danh mục thất bại", variant: "destructive" });
         }
        
    }
    if(!isOpen || newCate ===null) return <></>

    return(
        <Dialog open={isOpen} onOpenChange={onClose}>

        <DialogContent className="sm:max-w-[425px] lg:max-w-[700px]">
            <DialogHeader>
                <DialogTitle>Cập nhật danh mục</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSM}>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-row items-center gap-4 w-full">
                            <Label className="whitespace-nowrap w-30">Tên danh mục</Label>
                            <Input
                                minLength={2}
                                name="categoryName"
                                placeholder="Tên danh mục mới"
                                type="text"
                                value={newCate.categoryName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-row items-center gap-4 w-full">
                            <Label className="whitespace-nowrap w-30">Danh mục cha</Label>
                            <Select onValueChange={handleSelectChange} value={newCate.parentCategoryName}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn danh mục cha" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((item,index)=>(
                                        <SelectItem key={index+item.categoryId} value={item.categoryName}>
                                            {item.categoryName}

                                        </SelectItem>       
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <div className="w-full mt-2">
                        <Button  variant="destructiveOutline" onClick={handleDelete}>Xoá </Button>
                    </div>
                    <Button onClick={handleSM}>
                        Cập nhật
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
    )
}