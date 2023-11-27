"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";

const DeleteServerModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "deleteServer";
    const { server } = data;

    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/servers/${server?.id}`);
            onClose();
            router.refresh();
            router.push("/");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent >
                <DialogHeader >
                    <DialogTitle >
                        Delete Server
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to do this? <br />
                        <span className="text-indigo-500 font-bold">{server?.name}</span> will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-between">
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button disabled={isLoading} onClick={handleClick} variant={"destructive"}>
                        Leave
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteServerModal;
