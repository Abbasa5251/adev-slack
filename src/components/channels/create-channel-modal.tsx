import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCreateChannelModal } from "@/store/use-create-channel-modal";

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
import { toast } from "sonner";
import { useCreateChannel } from "@/api/use-create-channel";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const formSchema = z.object({
	name: z.string().min(1, { message: "Workspace name is required" }),
});

type Props = {};

function CreateChannelModal({}: Props) {
	const router = useRouter();
	const workspaceId = useWorkspaceId();
	const { mutate, isPending } = useCreateChannel();
	const [open, setOpen] = useCreateChannelModal();
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
		mutate(
			{ ...values, workspaceId },
			{
				onSuccess: () => {
					toast.success("Channel created successfully");
					handleClose();
				},
				onError: (error) => {
					toast.error(error.message);
				},
			}
		);
	}
	const formatChannelName = (value: string) => {
		return value.toLowerCase().replace(/\s+/g, "-");
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add a Channel</DialogTitle>
					<DialogDescription>
						Add a channel to your workspace
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
									<FormLabel>Channel Name</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											placeholder="e.g. plan-budget"
											{...field}
											onChange={(e) => {
												const formattedValue =
													formatChannelName(
														e.target.value
													);
												field.onChange(formattedValue);
											}}
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

export default CreateChannelModal;
