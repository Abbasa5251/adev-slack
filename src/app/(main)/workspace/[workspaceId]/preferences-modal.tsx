import React, { useState } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { TrashIcon } from "lucide-react";
import { useUpdateWorkspace } from "@/api/use-update-workspace";
import { useRemoveWorkspace } from "@/api/use-remove-workspace";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useConfirm from "@/hooks/use-confirm";

const formSchema = z.object({
	name: z.string().min(1, { message: "Workspace name is required" }),
});

type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
	initialValue: string;
};

function PreferencesModal({ open, setOpen, initialValue }: Props) {
	const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
		useUpdateWorkspace();
	const { mutate: removeWorkspace, isPending: isRemovingWorkspace } =
		useRemoveWorkspace();
	const [ConfirmDialog, confirm] = useConfirm(
		"Are you sure?",
		"This action is irreversible"
	);
	const [value, setValue] = useState(initialValue);
	const [editOpen, setEditOpen] = useState(false);
	const workspaceId = useWorkspaceId();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: value,
		},
	});

	function handleEdit(values: z.infer<typeof formSchema>) {
		updateWorkspace(
			{
				id: workspaceId,
				...values,
			},
			{
				onSuccess: () => {
					toast.success("Workspace updated");
					setValue(values.name);
					setEditOpen(false);
				},
				onError: () => {
					toast.error("Failed to update workspace");
				},
			}
		);
	}

	async function handleRemove() {
		const ok = await confirm();
		if (!ok) return;
		removeWorkspace(
			{
				id: workspaceId,
			},
			{
				onSuccess: () => {
					toast.success("Workspace Deleted");
					router.replace("/");
				},
				onError: () => {
					toast.error("Failed to delete workspace");
				},
			}
		);
	}

	return (
		<>
			<ConfirmDialog />
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="p-0 bg-gray-50 overflow-hidden">
					<DialogHeader className="p-4 border-b bg-white">
						<DialogTitle>{value}</DialogTitle>
						<DialogDescription>
							Preferences for workspace
						</DialogDescription>
					</DialogHeader>
					<div className="px-4 pb-4 flex flex-col gap-y-2">
						<Dialog open={editOpen} onOpenChange={setEditOpen}>
							<DialogTrigger asChild>
								<div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
									<div className="flex items-center justify-between">
										<p className="text-sm font-semibold">
											Workspace name
										</p>
										<p className="text-sm text-[#1264A3] hover:underline font-semibold">
											Edit
										</p>
									</div>
									<p className="text-sm">{value}</p>
								</div>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Edit Workspace</DialogTitle>
									<DialogDescription>
										Rename this workspace
									</DialogDescription>
								</DialogHeader>
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(handleEdit)}
										className="space-y-2.5"
									>
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Name</FormLabel>
													<FormControl>
														<Input
															disabled={
																isUpdatingWorkspace
															}
															placeholder="Work, Personal, etc."
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<DialogFooter>
											<DialogClose asChild>
												<Button
													variant={"outline"}
													disabled={
														isUpdatingWorkspace
													}
												>
													Cancel
												</Button>
											</DialogClose>
											<Button
												type="submit"
												disabled={isUpdatingWorkspace}
											>
												Save
											</Button>
										</DialogFooter>
									</form>
								</Form>
							</DialogContent>
						</Dialog>
						<button
							disabled={isRemovingWorkspace}
							onClick={handleRemove}
							className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
						>
							<TrashIcon className="size-4" />
							<p className="text-sm font-semibold">
								Delete Workspace
							</p>
						</button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default PreferencesModal;
