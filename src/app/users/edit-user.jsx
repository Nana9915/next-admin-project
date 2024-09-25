import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const EditUserDialog = ({ Editopen, onEdtClose,item }) => {

  return (
    <Dialog open={Editopen} onOpenChange={onEdtClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" >
          <div className="grid gap-2">
            <Label htmlFor="firstname">Овог</Label>
            <Input onChange={() => item.firstname} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastname">Нэр</Label>
            <Input onChange={() => item.firstname} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">И-мэйл</Label>
            <Input id="email" defaultValue="{item.email}" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Зураг</Label>
            <Input id="imageUrl" defaultValue="{item.imageUrl}" />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => onEdtClose(false)}
            variant="outline"
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
