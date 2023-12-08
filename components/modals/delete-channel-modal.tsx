"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import qs from "query-string";

const DeleteChannelModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "deleteChannel";
    const { server, channel } = data;

    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        try {
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id
                }
            });
            await axios.delete(url);
            onClose();
            router.push(`/servers/${server?.id}`);
            router.refresh();
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
                        Delete Channel
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to do this? <br />
                        <span className="text-indigo-500 font-bold">{channel?.name}</span> will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-between">
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button disabled={isLoading} onClick={handleClick} variant={"destructive"}>
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteChannelModal;
