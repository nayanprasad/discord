"use client";
import axios from "axios";
import React, {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {useModal} from "@/hooks/use-modal-store";
import {Button} from "@/components/ui/button";
import qs from "query-string";

const DeleteChannelModal = () => {
    const {isOpen, onClose, type, data} = useModal();

    const isModalOpen = isOpen && type === "deleteMessage";
    const {apiUrl, query} = data;

    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        try {
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            });
            await axios.delete(url);
            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Delete Message
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to do this? <br/>
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
