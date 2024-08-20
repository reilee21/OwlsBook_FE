
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { roles } from "./AdminAccountTable";
import { clerkClient } from '@clerk/nextjs/server';

interface Admin{
    username:string,
    password:string,    
    role:string,
    firstName:string,
    lastName:string,
    phonenumber:string,
    email:string,
}

export default function AddStaffModal() {
    const [admin, setAdmin] = useState<Admin>({
        username: '',
        password: '',
        firstName:'',
        lastName:'',
        role: '',
        phonenumber: '',
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAdmin(prevAdmin => ({
            ...prevAdmin,
            [name]: value
        }));
    };
    const handleRoleChange = (val) =>{
        setAdmin(prevAdmin => ({
            ...prevAdmin,
            role: val
        }));
    }

    const handleSubmit = () => {
        // Handle form submission logic here, e.g., sending data to server
        console.log('Submitted admin data:', admin);
        handleAddtoClerk();
    };
    const handleAddtoClerk = async () =>{
        const newAdminClerk ={
            firstName: admin.firstName,
            lastName: admin.lastName,
            emailAddress: [ admin.email ],
            password: admin.password
        };
        try{
            const response = await fetch(`/api/adminaccount/create`,{
                method:'POST',
                body: JSON.stringify(newAdminClerk),
                headers: {
                    'content-type': 'application/json'
                },
            });
            console.log(response)
        }
        catch(e){
            console.error(e);
        }
       
    }



    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Thêm nhân viên</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] lg:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Thêm nhân viên mới</DialogTitle>
                    </DialogHeader>
                    <div className="w-full">
                        <div className="flex flex-row items-center gap-4">
                            <Label className="whitespace-nowrap w-20">Họ Tên </Label>
                            <Input
                                name="lastName"
                                value={admin.lastName}
                                onChange={handleChange}
                                placeholder="Họ"
                                type="text"
                                maxLength={50}
                                className="w-full"

                            />
                              <Input
                                className="w-full"

                                name="firstName"
                                value={admin.firstName}
                                onChange={handleChange}
                                placeholder="Tên"
                                type="text"
                                minLength={8}
                            />
                        </div>
                        
                    </div>
                    <div className="flex md:flex-row flex-col gap-2 w-full">
                        <div className="md:basic-1/2 flex flex-row items-center gap-2 w-full">
                            <Label className="whitespace-nowrap w-20">Tài khoản</Label>
                            <Input
                                name="username"
                                value={admin.username}
                                onChange={handleChange}
                                placeholder="Tài khoản đăng nhập"
                                type="text"
                                maxLength={50}
                            />
                        </div>
                        <div className="md:basic-1/2 flex flex-row items-center gap-2 w-full">
                            <Label className="whitespace-nowrap w-20">Mật khẩu</Label>
                            <Input
                                name="password"
                                value={admin.password}
                                onChange={handleChange}
                                placeholder="Mật khẩu đăng nhập"
                                type="password"
                                minLength={8}
                            />
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col gap-4">
                        <div className="w-full flex flex-row items-center gap-2">
                            <Label className="whitespace-nowrap w-20">Chức vụ</Label>
                            <Select onValueChange={handleRoleChange}>
                                <SelectTrigger className="w-full mt-2">
                                    <SelectValue placeholder="Chọn chức vụ" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(roles).map(([key, value], index) => (
                                        <SelectItem value={key} key={'role-' + index}>
                                            {value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full flex flex-row items-center gap-2">
                            <Label className="whitespace-nowrap w-20">Email</Label>
                            <Input
                                name="email"
                                value={admin.email}
                                onChange={handleChange}
                                placeholder="Email"
                                type="email"
                                minLength={8}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <Label className="w-fit whitespace-nowrap">Số điện thoại</Label>
                        <Input
                            name="phonenumber"
                            value={admin.phonenumber}
                            onChange={handleChange}
                            placeholder="Số điện thoại"
                            type="text"
                            maxLength={10}
                        />
                    </div>

                    <DialogFooter>
                        <Button onClick={handleSubmit}>Tạo mới</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}