import React from "react";

interface Props {
	params: {
		workspaceId: string;
	};
}

function WorkspaceIdPage({ params: { workspaceId } }: Props) {
	return <div>WorkspaceId: {workspaceId}</div>;
}

export default WorkspaceIdPage;
