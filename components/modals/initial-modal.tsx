"use client"
import React, {Fragment, useEffect} from 'react';
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormLabel, FormItem, FormMessage} from "@/components/ui/form";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {FileUpload} from "@/components/file-upload";


const formSchema = z.object({
    name: z.string().min(1, {message: "Server name is required."}),
    imageUrl: z.string().min(1, {message: "Server image is required."})
});

const InitialModal = () => {

    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        },
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log("submit");
    }

    if (!isMounted)
        return null;

    return (
        <Fragment>
            <Dialog open>
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
                                        <FormControl>
                                            <FileUpload
                                                endpoint="serverImage"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage/>
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
                                                   placeholder={"Enter a server name"}
                                                   {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
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

export default InitialModal;
