import React, { useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SignInFlow } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

const formSchema = z
	.object({
		name: z.string().max(50),
		email: z.string().email({ message: "Invalid email address" }),
		password: z
			.string()
			.min(3, { message: "Password must be 3 or more characters long" })
			.max(50),
		confirm_password: z
			.string()
			.min(3, { message: "Password must be 3 or more characters long" })
			.max(50),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Passwords don't match",
		path: ["confirm_password"], // path of error
	});

interface SignUpCardProps {
	setState: (state: SignInFlow) => void;
}

function SignUpCard({ setState }: SignUpCardProps) {
	const { signIn } = useAuthActions();
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState("");
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirm_password: "",
		},
	});

	function handleProvider(value: "github" | "google") {
		setIsPending(true);
		signIn(value).finally(() => {
			setIsPending(false);
		});
	}

	function onSubmit(values: z.infer<typeof formSchema>) {
		setIsPending(true);
		const { confirm_password, ...signUpData } = values;
		signIn("password", { ...signUpData, flow: "signUp" })
			.catch((e) => {
				console.log(e);
				setError("Something went wrong");
			})
			.finally(() => {
				setIsPending(false);
			});
	}

	return (
		<Card className="w-full h-full p-8">
			<CardHeader className="px-0 pt-0">
				<CardTitle>Sign up to Continue</CardTitle>
				<CardDescription>
					Use your email or another service to continue
				</CardDescription>
			</CardHeader>
			{!!error && (
				<div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
					<TriangleAlert className="size-4" />
					<p>{error}</p>
				</div>
			)}
			<CardContent className="space-y-5 px-0 pb-0">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-2.5"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full Name</FormLabel>
									<FormControl>
										<Input
											disabled={false || isPending}
											placeholder="John Doe"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											disabled={false || isPending}
											placeholder="john.doe@example.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Passsword</FormLabel>
									<FormControl>
										<Input
											disabled={false || isPending}
											type="password"
											placeholder="********"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirm_password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Passsword</FormLabel>
									<FormControl>
										<Input
											disabled={false || isPending}
											type="password"
											placeholder="********"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-full"
							size={"lg"}
							disabled={false || isPending}
						>
							Continue
						</Button>
					</form>
				</Form>

				<Separator />

				<div className="flex flex-col gap-y-2.5">
					<Button
						disabled={false && isPending}
						onClick={() => handleProvider("google")}
						variant={"outline"}
						size={"lg"}
						className="w-full relative"
					>
						<FcGoogle className="size-5 absolute top-3 left-2.5" />
						Continue with Google
					</Button>
					<Button
						disabled={false && isPending}
						onClick={() => handleProvider("github")}
						variant={"outline"}
						size={"lg"}
						className="w-full relative"
					>
						<FaGithub className="size-5 absolute top-3 left-2.5" />
						Continue with Github
					</Button>
				</div>
				<p className="text-xs text-muted-foreground">
					Already have an account?{" "}
					<span
						onClick={() => setState("signIn")}
						className="text-sky-700 hover:underline cursor-pointer"
					>
						Sign In
					</span>
				</p>
			</CardContent>
		</Card>
	);
}

export default SignUpCard;
