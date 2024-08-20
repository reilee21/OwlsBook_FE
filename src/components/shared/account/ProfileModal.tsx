import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { useGetAccountProfileQuery, useUpdateRoleMutation } from "@/services/acccount/accountApi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { roles } from "@/components/account/AdminAccountTable";
import ChangePasswordDialog from "./ChangePasswordDialog";
import { useToast } from "@/components/ui/use-toast";


export default function ProfileModal({username,show,handleShow}){
    const { data: acc} = useGetAccountProfileQuery( { username });
    const [selectedRole, setSelectedRole] = useState("");
    const [changePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false);
    const [update] = useUpdateRoleMutation();
    const toast = useToast();
    useEffect(()=>{
        if(acc) {
            console.log(acc)
            setSelectedRole(acc.role)
        }
    },[acc])
    const changePass = async (pass) =>{
        const data = {
            accId : acc.accountId,
            newPass: pass
        }
        try{
            const rs = await fetch(`/api/adminaccount/updatePass`,{
                method:'POST',
                body:JSON.stringify(data)
            })
            console.log(rs);
        }catch(e){
            console.error(e)
        }

    }
    const submit = async () => {
        const dtsm  = {username:acc.username,role:selectedRole}
       try{
            var rs = await update(dtsm);
           if(rs){
            toast.toast({
                title: "Cập nhật chức vụ thành công ",
                duration:2000,
                
              })
           }
        }
       catch(e){
            console.error(e);
        }
    }
   
    const ano =() =>{}
    if(!acc) return <></>
    return(
        <>
        <Dialog open={show} onOpenChange={handleShow}>       
            <DialogContent className="sm:max-w-[425px] lg:max-w-[700px] " >
                <DialogHeader>
                    <DialogTitle> Tài khoản</DialogTitle>
                </DialogHeader>
             
                <div className="flex flex-row gap-2 w-full">
                    <div className="w-full flex flex-row items-center gap-2">
                        <Label className="whitespace-nowrap w-20">Tài khoản</Label>
                        <Input className="w-full" value={acc.username || ''} onChange={ano} disabled/>
                    </div>
                    <div className="w-full flex flex-row items-center gap-2">
                        <Label className="whitespace-nowrap w-20">Họ tên</Label>
                        <Input className="w-full" value={acc.customerName || ''} onChange={ano} disabled/>
                    </div>
                </div>
                <div className="flex flex-row gap-2 w-full">
                    <div className="w-full flex flex-row items-center gap-2">
                        <Label className="whitespace-nowrap w-20">Email</Label>
                        <Input className="w-full" value={acc.email || ''} onChange={ano} disabled/>
                    </div>
                    <div className="w-full flex flex-row items-center gap-2">
                        <Label className="whitespace-nowrap py-2">Số điện thoại</Label>
                        <Input className="w-full" value={acc.phoneNumber || ''} onChange={ano} disabled/>
                    </div>
                </div>
                <div className="flex flex-row gap-2 w-full">
                    <Label className="whitespace-nowrap w-20 mt-2">Địa chỉ</Label>
                    <Textarea disabled value={acc.address+", "+ acc.ward+", "+acc.district+", "+acc.city} onChange={ano}/>
                </div>
                <div className="">
                    <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value)}>
                        <SelectTrigger className="w-full mt-2">
                            <SelectValue placeholder="Chọn chức vụ" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(roles).map(([key, value]) => (
                                <SelectItem key={key} value={key}>
                                    {value}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                

                <DialogFooter>
                   <div className="flex flex-row gap-4">
                    <Button variant="link" onClick={() => setChangePasswordDialogOpen(true)}>
                        Đổi mật khẩu
                    </Button>
                    <Button onClick={submit}>Lưu</Button>
                   </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        <ChangePasswordDialog
            email={acc ? acc.email : ''}
            open={changePasswordDialogOpen}
            onClose={() => setChangePasswordDialogOpen(false)}
            onUpdatePassword={changePass}
        />
        </>
    )
}