"use client"
import React, {Fragment, useState} from 'react';
import axios from "axios";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useModal} from "@/hooks/use-modal-store";
import {useRouter} from "next/navigation";


const LeaveServerModal = () => {
    const router = useRouter();
    const { isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === "leaveServer";
    const { server } = data;

    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.patch(`/api/servers/${server?.id}/leave`);
            onClose();
            router.push("/");
            router.refresh();
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Fragment>
            <Dialog open={isModalOpen} onOpenChange={onClose}>
                <DialogContent >
                    <DialogHeader >
                        <DialogTitle >
                            Leave Server
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to leave <span className="text-indigo-500 font-bold">{server?.name}</span>?
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
        </Fragment>
    );
};

export default LeaveServerModal;
