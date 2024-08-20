import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ChangePasswordDialogProps {
  email:string;
  open: boolean;
  onClose: () => void;
  onUpdatePassword: (newPassword: string) => void;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
    email,
  open,
  onClose,
  onUpdatePassword,
}) => {
  const [newPassword, setNewPassword] = useState("");

  const handleUpdatePassword = () => {
    onUpdatePassword(newPassword);
    setNewPassword(""); 
  };

  return (
    <Dialog open={open} onOpenChange={onClose} className="px-4">
      <DialogContent >
        <DialogHeader>
          <DialogTitle>Đổi mật khẩu: {email}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-row gap-2 w-full items-center">
          <Label className="whitespace-nowrap ">Mật khẩu mới</Label>
          <Input
            className="w-full"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleUpdatePassword}>Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
