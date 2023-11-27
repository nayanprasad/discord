"use client"
import React, {Fragment, useEffect} from 'react';
import axios from "axios";
import qs from "query-string";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormLabel, FormItem, FormMessage} from "@/components/ui/form";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,} from "@/components/ui/dialog";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useParams, useRouter} from "next/navigation";
import {useModal} from "@/hooks/use-modal-store";



const formSchema = z.object({
    name: z.string().min(1, {message: "Channel name is required."}),
    type: z.string().min(1, {message: "Channel type is required."})
});

const CreateChannelModal = () => {

    const router = useRouter();
    const params = useParams();
    const {onClose, type, isOpen} = useModal();

    const isModalOpen = isOpen && type === "createChannel";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: "",
        },
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            form.clearErrors();
            const values = form.getValues();

            if(values.name === "general" || values.name === "General" || values.name === "GENERAL")
                form.control.setError("name", {message: "Channel name cannot be general."});
            if (!values.type)
                form.setError("type", {message: "Channel type is required."});
            if (!values.name)
                form.control.setError("name", {message: "Channel name is required."});
            if (!values.type || !values.name)
                return;


            const {data} = await axios.post(`/api/channels/${params?.serverId}`, values);

            form.reset();
            router.refresh();
            onClose();
        } catch (e) {
            console.log(e);
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Fragment>
            <Dialog open={isModalOpen} onOpenChange={handleClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Create a Channel
                        </DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <FormField
                                control={form.control}
                                name={"name"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Channel name
                                        </FormLabel>
                                        <FormControl>
                                            <Input className="dark:bg-[#101012]"
                                                   placeholder={"Enter a servers name"}
                                                   {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"type"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Channel Type
                                        </FormLabel>
                                        <FormControl>
                                            <Select  onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your channel type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="TEXT">Text</SelectItem>
                                                    <SelectItem value="AUDIO">Audio</SelectItem>
                                                    <SelectItem value="VIDEO">Video</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        {/*<FormMessage/>*/}
                                    </FormItem>
                                )}
                            />
                            <Button type={"submit"}>Create</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default CreateChannelModal;
