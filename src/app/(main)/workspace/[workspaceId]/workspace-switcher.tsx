import { useGetWorkspace } from "@/api/use-get-workspace";
import { useGetWorkspaces } from "@/api/use-get-workspaces";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useCreateWorkspaceModal } from "@/store/use-create-workspace-modal";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

function WorkspaceSwitcher({}: Props) {
	const router = useRouter();
	const [_, setOpen] = useCreateWorkspaceModal();
	const workspaceId = useWorkspaceId();
	const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
		id: workspaceId,
	});
	const { data: workspaces, isLoading: workspacesLoading } =
		useGetWorkspaces();

	const filteredWorkspaces = workspaces?.filter(
		(workspace) => workspace?._id !== workspaceId
	);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="size-9 relative overflow-hidden bg-[#ababab] hover:bg-[#ababab]/80 text-slate-800 font-semibold text-xl">
					{workspaceLoading ? (
						<Loader className="size-5 animate-spin shrink-0" />
					) : (
						workspace?.name.charAt(0).toUpperCase()
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="bottom" align="start" className="w-64">
				<DropdownMenuItem
					onClick={() => router.push(`/workspace/${workspaceId}`)}
					className="cursor-pointer flex-col justify-start items-start capitalize"
				>
					{workspace?.name}
					<span className="text-xs text-muted-foreground">
						Active workspace
					</span>
				</DropdownMenuItem>
				{filteredWorkspaces?.map((workspace) => (
					<DropdownMenuItem
						key={workspace?._id}
						onClick={() =>
							router.push(`/workspace/${workspace?._id}`)
						}
						className="cursor-pointer capitalize"
					>
						<div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">
							{workspace?.name.charAt(0).toUpperCase()}
						</div>
						<p className="truncate">{workspace?.name}</p>
					</DropdownMenuItem>
				))}
				<DropdownMenuItem
					className="cursor-pointer"
					onClick={() => setOpen(true)}
				>
					<div className="size-9 relative overflow-hidden bg-[#f2f2f2] text-slate-800 font-semibold text-xl rounded-md flex items-center justify-center mr-2">
						<Plus />
					</div>
					Create a new workspace
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default WorkspaceSwitcher;
