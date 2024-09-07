import { useCurrentMember } from "@/api/use-current-member";
import { useGetWorkspace } from "@/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { AlertTriangle, Loader } from "lucide-react";
import React from "react";
import WorkspaceHeader from "./workspace-header";

type Props = {};

function WorkspaceSidebar({}: Props) {
	const workspaceId = useWorkspaceId();

	const { data: currentMember, isLoading: isCurrentMemberLoading } =
		useCurrentMember({
			workspaceId,
		});
	const { data: workspace, isLoading: isWorkspaceLoading } = useGetWorkspace({
		id: workspaceId,
	});

	if (isCurrentMemberLoading || isWorkspaceLoading) {
		return (
			<div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
				<Loader className="size-5 animate-spin text-white" />
			</div>
		);
	}

	if (!currentMember || !workspace) {
		return (
			<div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
				<AlertTriangle className="size-5 text-white" />
				<p className="text-white text-sm">Workspace not found</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col bg-[#5E2C5F] h-full">
			<WorkspaceHeader
				workspace={workspace}
				isAdmin={currentMember.role === "admin"}
			/>
		</div>
	);
}

export default WorkspaceSidebar;
