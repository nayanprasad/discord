"use client"
import React, {Fragment, useEffect} from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormLabel, FormItem, FormMessage} from "@/components/ui/form";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {FileUpload} from "@/components/file-upload";
import {useRouter} from "next/navigation";
import {useModal} from "@/hooks/use-modal-store";


const formSchema = z.object({
    name: z.string().min(1, {message: "Server name is required."}),
    imageUrl: z.string().min(1, {message: "Server image is required."})
});

const EditServerModal = () => {

    const router = useRouter();
    const {onClose, type, isOpen, data} = useModal();
    const {server} = data;

    const isModalOpen = isOpen && type === "editServer";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        },
    });

    useEffect(() => {
        if (server) {
            form.setValue("name", server.name);
            form.setValue("imageUrl", server.imageUrl);
        }
    }, [server, form]);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            form.clearErrors();
            const values = form.getValues();

            if (!values.imageUrl)
                form.setError("imageUrl", {message: "Server image is required."});
            if (!values.name)
                form.control.setError("name", {message: "Server name is required."});
            if (!values.imageUrl || !values.name)
                return;

            const {data} = await axios.patch(`/api/servers/${server?.id}`, values);

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
                            Create a server
                        </DialogTitle>
                        <DialogDescription>
                            Your server is where you and your friends hang out. Make yours and start talking. Pick a
                            name and upload an image to get started. You can always add more details later.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <FormField
                                control={form.control}
                                name={"imageUrl"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Upload an image
                                        </FormLabel>
                                        <FormControl>
                                            <div className="flex justify-center items-center">
                                                <FileUpload
                                                    endpoint="serverImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </div>

                                        </FormControl>
                                        {/*<FormMessage/>*/}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"name"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            server name
                                        </FormLabel>
                                        <FormControl>
                                            <Input className="dark:bg-[#101012]"
                                                   placeholder={"Enter a servers name"}
                                                   {...field}
                                            />
                                        </FormControl>
                                        {/*<FormMessage/>*/}
                                    </FormItem>
                                )}
                            />
                            <Button type={"submit"}>Save</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default EditServerModal;
