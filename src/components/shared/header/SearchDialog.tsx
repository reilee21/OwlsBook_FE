import Search from "@/components/icons/Search"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"


export default function SearchDialog ({submit,search}){
    return(
        <>
            <Dialog>
            <DialogTrigger asChild>
                <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                    <Search className="h-6 w-6" />
                </button>
            </DialogTrigger>
            <DialogContent className="w-4/5 rounded-lg" >
                <DialogHeader>
                    <DialogTitle> Tìm kiếm</DialogTitle>
                </DialogHeader>
                    <Input type="text" className="" onChange={(e)=>search(e.target.value)} required />
                <DialogFooter>
                    <Button onClick={submit}>Tìm</Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        
        </>
    )
}