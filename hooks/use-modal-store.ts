import {create} from "zustand";
import {Server, ChannelType, Channel} from "@prisma/client";


export type ModalType =
    "CreateServer"
    | "invite"
    | "editServer"
    | "members"
    | "createChannel"
    | "leaveServer"
    | "deleteServer"
    | "editChannel"
    | "deleteChannel";

interface ModalData {
    server?: Server
    channelType?: ChannelType;
    channel?: Channel;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({isOpen: true, type, data}),
    onClose: () => set({isOpen: false, type: null})
}));
