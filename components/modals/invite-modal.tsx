"use client"
import React, {Fragment, useState} from 'react';
import axios from "axios";
import { Check, Copy, RefreshCw } from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useModal} from "@/hooks/use-modal-store";
import {useOrigin} from "@/hooks/use-origin";


const InviteModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal();
    const origin = useOrigin();

    const isModalOpen = isOpen && type === "invite";
    const { server } = data;

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    const onNew = async () => {
        try {
            setIsLoading(true);
            const res = await axios.patch(`/api/servers/${server?.id}/invite-code`);

            if (res.status === 200)
                onOpen("invite", { server: res.data.server});
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
                            Invite Friends
                        </DialogTitle>
                    </DialogHeader>
                    <div>
                        <Label>
                            Server invite link
                        </Label>
                        <div className="flex items-center mt-2 gap-x-2">
                            <Input
                                disabled={isLoading}
                                value={inviteUrl}
                            />
                            <Button className="bg-inherit hover:bg-zinc-500 text-white" disabled={isLoading} onClick={onCopy} size="icon">
                                {copied
                                    ? <Check className="w-4 h-4" />
                                    : <Copy className="w-4 h-4" />
                                }
                            </Button>
                        </div>
                        <Button
                            onClick={onNew}
                            disabled={isLoading}
                            variant="link"
                            size="sm"
                            className="text-xs text-zinc-500 mt-4"
                        >
                            Generate a new link
                            <RefreshCw className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default InviteModal;
