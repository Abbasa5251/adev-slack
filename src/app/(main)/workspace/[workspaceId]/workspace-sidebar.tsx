import { useCurrentMember } from "@/api/use-current-member";
import { useGetWorkspace } from "@/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
	AlertTriangle,
	HashIcon,
	Loader,
	MessageSquareText,
	SendHorizonal,
} from "lucide-react";
import React from "react";
import WorkspaceHeader from "./workspace-header";
import SidebarItem from "./sidebar-item";
import { useGetChannels } from "@/api/use-get-channels";
import WorkspaceSection from "./workspace-section";
import { useGetMembers } from "@/api/use-get-members";
import UserItem from "./user-item";
import { useCreateChannelModal } from "@/store/use-create-channel-modal";

type Props = {};

function WorkspaceSidebar({}: Props) {
	const workspaceId = useWorkspaceId();

	const [_open, setOpen] = useCreateChannelModal();

	const { data: currentMember, isLoading: currentMemberLoading } =
		useCurrentMember({
			workspaceId,
		});
	const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
		id: workspaceId,
	});
	const { data: channels, isLoading: channelsLoading } = useGetChannels({
		workspaceId,
	});
	const { data: members, isLoading: membersLoading } = useGetMembers({
		workspaceId,
	});

	if (currentMemberLoading || workspaceLoading) {
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
			<div className="flex flex-col px-2 mt-3">
				<SidebarItem
					label="Thread"
					icon={MessageSquareText}
					id="threads"
				/>
				<SidebarItem
					label="Drafts & Sent"
					icon={SendHorizonal}
					id="drafts"
				/>
			</div>
			<WorkspaceSection
				label="Channels"
				hint="New Channel"
				onNew={
					currentMember.role === "admin"
						? () => setOpen(true)
						: undefined
				}
			>
				{channels?.map((item) => (
					<SidebarItem
						key={item._id}
						label={item.name}
						icon={HashIcon}
						id={item._id}
					/>
				))}
			</WorkspaceSection>
			<WorkspaceSection
				label="Direct Messages"
				hint="New direct message"
				onNew={() => {}}
			>
				{members?.map((item) => (
					<UserItem
						key={item._id}
						id={item._id}
						label={item.user.name}
						image={item.user.image}
					/>
				))}
			</WorkspaceSection>
		</div>
	);
}

export default WorkspaceSidebar;
