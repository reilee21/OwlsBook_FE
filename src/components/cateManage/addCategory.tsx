import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle, Dialog, DialogContent, DialogTrigger, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useToast } from "../ui/use-toast";
import { useCreateCategoryMutation,  useGetAllCatesQuery } from "@/services/cate/CateApi";




interface CategoryCreate {
    categoryName: string;
    parentCategoryName?: string;
}
const initialCategoryState: CategoryCreate = {
    categoryName: '',
    parentCategoryName: undefined,
};


export default function AddCategory({ updated }) {
    const [newCategory, setNewCategory] = useState<CategoryCreate>(initialCategoryState);
    const [isOpen, setIsOpen] = useState(false);

    const [createCategory] = useCreateCategoryMutation();
    const { data: categories = [] } = useGetAllCatesQuery();
    const { toast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value
        }));
    };

 

    const handleSelectChange = (value: string) => {
        setNewCategory((prevCategory) => ({
            ...prevCategory,
            parentCategoryName: value ? value : undefined
        }));
    };

    const handleSM = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
           var rs =  await createCategory(newCategory).unwrap(); 
           if(rs && rs.code){
            toast({ title: "Tạo danh mục thất bại",description:rs.message, variant: "destructive" });

           }else{
            toast({ description: "Tạo danh mục thành công." ,variant:"success"});
            updated();
            setIsOpen(false);
           }
           
        } catch (error) {
            toast({ description: "Failed to create category.", variant: "destructive" });
        }
    };

    const handleCloseDialog = (e: boolean) => {
        setNewCategory(initialCategoryState); 
        setIsOpen(e);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(e) => handleCloseDialog(e)}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)}>Thêm</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Tạo danh mục</DialogTitle>
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
                                    value={newCategory.categoryName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="flex flex-row items-center gap-4 w-full">
                                <Label className="whitespace-nowrap w-30">Danh mục cha</Label>
                                <Select onValueChange={handleSelectChange} value={newCategory.parentCategoryName}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn danh mục cha" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.categoryId} value={category.categoryName}>
                                                {category.categoryName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button className="mt-2" type="submit">Thêm</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
