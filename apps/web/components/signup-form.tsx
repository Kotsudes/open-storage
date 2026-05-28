"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form-nextjs";
import * as z from "zod";
import { useRouter } from "next/navigation";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
    const router = useRouter();
    const formSchema = z
        .object({
            name: z.string().min(1, "Name is required"),
            email: z.email("Invalid email address"),
            password: z
                .string()
                .min(8, "Password must be at least 8 characters long"),
            confirmPassword: z
                .string()
                .min(8, "Confirm Password must be at least 8 characters long"),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Passwords do not match",
        });

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async (values) => {
            const { error } = await authClient.signUp.email({
                name: values.value.name,
                email: values.value.email,
                password: values.value.password,
                callbackURL: "/",
            });

            if (error?.code === "422") {
                toast.error(
                    "Email already in use. Please use a different email."
                );
                return;
            }

            if (error) {
                toast.error(error.status);
                return;
            }

            toast.success("Account created successfully!");
            router.push("/");
        },
    });

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
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
                                            placeholder="John Doe"
                                        />
                                    </Field>
                                );
                            }}
                        </form.Field>
                        <form.Field name="email">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="email">
                                            Email
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
                                            type="email"
                                            placeholder="m@example.com"
                                        />
                                        <FieldDescription>
                                            We&apos;ll use this to contact you.
                                            We will not share your email with
                                            anyone else.
                                        </FieldDescription>
                                    </Field>
                                );
                            }}
                        </form.Field>

                        <form.Field name="password">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="password">
                                            Password
                                        </FieldLabel>
                                        <Input
                                            id={field.name}
                                            type="password"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value
                                                )
                                            }
                                            aria-invalid={isInvalid}
                                        />
                                        <FieldDescription>
                                            Must be at least 8 characters long.
                                        </FieldDescription>
                                    </Field>
                                );
                            }}
                        </form.Field>
                        <form.Field name="confirmPassword">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="confirm-password">
                                            Confirm Password
                                        </FieldLabel>
                                        <Input
                                            id={field.name}
                                            type="password"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value
                                                )
                                            }
                                            aria-invalid={isInvalid}
                                        />
                                        <FieldDescription>
                                            Please confirm your password.
                                        </FieldDescription>
                                    </Field>
                                );
                            }}
                        </form.Field>
                        <FieldGroup>
                            <Field>
                                <Button type="submit">Create Account</Button>
                                <Button variant="outline" type="button">
                                    Sign up with Google
                                </Button>
                                <FieldDescription className="px-6 text-center">
                                    Already have an account?{" "}
                                    <Link href="/signin">Sign in</Link>.
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
