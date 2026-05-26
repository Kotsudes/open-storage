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
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select";
import { inventoryTypeEnum } from "@open-storage/shared";
import { useForm } from "@tanstack/react-form-nextjs";
import * as z from "zod";

export default function InventoryCreateSheet() {
    const formSchema = z.object({
        warehouseId: z.bigint("Warehouse is required"),
        name: z.string().min(1, "Name is required"),
        temperature: z.number().optional(),
        type: inventoryTypeEnum,
    });

    type CreateInventoryFormData = z.infer<typeof formSchema>;

    const defaultValues: CreateInventoryFormData = {
        warehouseId: BigInt(0),
        name: "Inventory Name",
        temperature: undefined,
        type: "OTHER",
    };

    const form = useForm({
        defaultValues,
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
                    <Button className="mt-4 ml-auto" size="lg">
                        Create Inventory
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
                        <SheetTitle>Enter the new inventory details</SheetTitle>
                        <SheetDescription>
                            This inventory will be added to the current
                            warehouse. You can edit or delete it later if
                            needed.
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

                            <form.Field name="temperature">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor="temperature">
                                                Temperature (°C)
                                            </FieldLabel>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value ?? ""}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value === ""
                                                            ? undefined
                                                            : Number(
                                                                  e.target.value
                                                              )
                                                    )
                                                }
                                                aria-invalid={isInvalid}
                                                type="number"
                                            />
                                        </Field>
                                    );
                                }}
                            </form.Field>
                            <form.Field name="type">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor="type">
                                                Inventory Type
                                            </FieldLabel>
                                            <NativeSelect
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => {
                                                    const selectedType =
                                                        inventoryTypeEnum.parse(
                                                            e.target.value
                                                        );
                                                    field.handleChange(
                                                        selectedType
                                                    );
                                                }}
                                                aria-invalid={isInvalid}
                                            >
                                                {inventoryTypeEnum.options.map(
                                                    (option) => (
                                                        <NativeSelectOption
                                                            key={option}
                                                            value={option}
                                                        >
                                                            {option}
                                                        </NativeSelectOption>
                                                    )
                                                )}
                                            </NativeSelect>
                                        </Field>
                                    );
                                }}
                            </form.Field>
                        </FieldGroup>
                    </div>
                    <SheetFooter>
                        <Button type="submit">Create Inventory</Button>
                    </SheetFooter>
                </SheetContent>
            </form>
        </Sheet>
    );
}
