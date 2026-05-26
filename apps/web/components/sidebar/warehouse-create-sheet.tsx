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
import * as z from "zod";

import { Plus } from "lucide-react";

export default function WarehouseCreateSheet() {
    const formSchema = z.object({
        name: z.string().min(1, "Name is required"),
        address: z.string().min(1, "Address is required"),
    });

    const form = useForm({
        defaultValues: {
            name: "Warehouse Name",
            address: "Warehouse Address",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async (values) => {
            console.log("Form submitted with values:", values.value);
        },
    });

    return (
        <Sheet>
            <SheetTrigger
                render={
                    <Button
                        className="w-full justify-start gap-2 p-2"
                        variant="ghost"
                    >
                        <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                            <Plus className="size-4" />
                        </div>
                        <div className="text-muted-foreground font-medium">
                            Add a warehouse
                        </div>
                    </Button>
                }
            />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                <SheetContent>
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
                                        <Field>
                                            <FieldLabel htmlFor="name">
                                                Full Name
                                            </FieldLabel>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                                aria-invalid={isInvalid}
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
                                        <Field>
                                            <FieldLabel htmlFor="address">
                                                Address
                                            </FieldLabel>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                                aria-invalid={isInvalid}
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
                </SheetContent>
            </form>
        </Sheet>
    );
}
