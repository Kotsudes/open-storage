"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useForm } from "@tanstack/react-form-nextjs";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";

import { toast } from "sonner";
import { apiRequest } from "@/lib/api";

export default function WarehouseCreateSheet({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    const formSchema = z.object({
        name: z.string().min(1, "Name is required"),
        address: z.string().min(1, "Address is required"),
    });

    type CreateWarehouseFormData = z.infer<typeof formSchema>;

    const defaultValues: CreateWarehouseFormData = {
        name: "Warehouse Name",
        address: "Warehouse Address",
    };

    const form = useForm({
        defaultValues,
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async (values) => {
            await createWarehouseMutation.mutateAsync(values.value);
        },
    });

    const createWarehouseMutation = useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            const response = await apiRequest(
                "/warehouses",
                "POST",
                undefined,
                data
            );
            return response;
        },
        mutationKey: ["createWarehouse"],
        onSuccess: () => {
            toast.success("Warehouse created successfully!");
            setOpen(false);
        },
        onError: (error) => {
            toast.error("Failed to create warehouse. Please try again.", {
                description: error.message,
            });
        },
    });

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="hidden">Add Warehouse</SheetTrigger>
            <SheetContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <SheetHeader>
                        <SheetTitle>Enter the new warehouse details</SheetTitle>
                        <SheetDescription>
                            This warehouse will be added to the system. You can
                            edit or delete it later if needed.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-1 flex-col gap-6 px-6 py-4">
                        <FieldGroup className="gap-6">
                            <form.Field name="name">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor="name">
                                                Warehouse name
                                            </FieldLabel>
                                            <Input
                                                id="create-warehouse-name"
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                                aria-invalid={isInvalid}
                                                type="text"
                                            />
                                        </Field>
                                    );
                                }}
                            </form.Field>
                            <form.Field name="address">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor="address">
                                                Address
                                            </FieldLabel>
                                            <Input
                                                id="create-warehouse-address"
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                                aria-invalid={isInvalid}
                                                type="text"
                                            />
                                        </Field>
                                    );
                                }}
                            </form.Field>
                        </FieldGroup>
                    </div>
                    <SheetFooter>
                        <Button type="submit">Create Warehouse</Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
