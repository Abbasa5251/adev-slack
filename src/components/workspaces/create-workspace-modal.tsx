import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCreateWorkspaceModal } from "@/store/use-create-workspace-modal";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateWorkspace } from "@/api/use-create-workspace";
import { toast } from "sonner";

const formSchema = z.object({
	name: z.string().min(1, { message: "Workspace name is required" }),
});

type Props = {};

function CreateWorkspaceModal({}: Props) {
	const router = useRouter();
	const { mutate, isPending } = useCreateWorkspace();
	const [open, setOpen] = useCreateWorkspaceModal();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});
	function handleClose() {
		setOpen(false);
		form.reset();
	}

	async function onSubmit(values: z.infer<typeof formSchema>) {
		mutate(values, {
			onSuccess: (id) => {
				toast.success("Workspace created successfully");
				router.push(`/workspace/${id}`);
				handleClose();
			},
			onError: (error) => {
				toast.error("Failed to create workspace");
				console.log(error);
			},
		});
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a Workspace</DialogTitle>
					<DialogDescription>
						Create a workspace to organize your messages.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Workspace Name</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											placeholder="Work, Personal, etc."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-end gap-2">
							<Button type="submit" disabled={isPending}>
								Create
							</Button>
							<Button
								type="button"
								variant={"outline"}
								onClick={handleClose}
							>
								Cancel
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default CreateWorkspaceModal;
