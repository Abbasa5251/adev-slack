"use client";

import React from "react";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspace } from "@/api/use-get-workspace";

function WorkspaceIdPage() {
	const workspaceId = useWorkspaceId();
	const { data, isLoading } = useGetWorkspace({ id: workspaceId });

	return <div>WorkspaceId: {workspaceId}</div>;
}

export default WorkspaceIdPage;
