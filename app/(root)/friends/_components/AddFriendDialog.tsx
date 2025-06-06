"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
// import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useMutationState } from "@/hooks/useMutationState";
import { api } from "@/convex/_generated/api";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ConvexError } from "convex/values";

const addFriendFormSchema = z.object({
    email: z
    .string()
    .min(1, { message: "This field can't be empty"})
    .email("Please enter a valid email"),
});

const AddFriendDialog = () => {
    const { mutate: createRequest } = useMutationState(api.request.create);

    const form = useForm<z.infer<typeof addFriendFormSchema>>({
        resolver: zodResolver
        (addFriendFormSchema),
        defaultValues: {
            email: "",
        },
    });
    
    const handleSubmit = async (values: z.
        infer<typeof addFriendFormSchema>) => {
            await createRequest({ email: values.email})
            .then(() => {
                form.reset();
                toast.success("Friend request sent!");

            })
            .catch((error) => {
                toast.error(
                    error instanceof ConvexError
                    ? error.data
                    : "unexpected error occurred"
                );
            });
        };

  return (
  <Dialog>
    <Tooltip>
        <TooltipTrigger>
        <div className="custom_button">
 <DialogTrigger>
 <UserPlus />
</DialogTrigger>
</div>
            
        </TooltipTrigger>
        <TooltipContent>
            <p>Add Friend</p>
        </TooltipContent>
        </Tooltip>

    <DialogContent>
        <DialogHeader>
            <DialogTitle>Add friend</DialogTitle>
            <DialogDescription>

                Send a request to connect with your friends!
            </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8"
                >
                    <FormField
                    control={form.control} 
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input 
                            placeholder="Email..."
                            {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <DialogFooter>
                    <div className="cursor-pointer" onClick={form.handleSubmit(handleSubmit)}>
                                Send
                            </div>
                    </DialogFooter>
                    </form>
                    </Form>
                    </DialogContent>
                    </Dialog>
    );
};

export default AddFriendDialog;

