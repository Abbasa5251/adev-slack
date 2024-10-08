"use client";

import React from "react";
import Toolbar from "./toolbar";
import Sidebar from "./sidebar";
import {
	ResizablePanel,
	ResizablePanelGroup,
	ResizableHandle,
} from "@/components/ui/resizable";
import WorkspaceSidebar from "./workspace-sidebar";

type Props = {
	children: React.ReactNode;
};

function WorkspaceLayout({ children }: Props) {
	return (
		<div className="h-full">
			<Toolbar />
			<div className="flex h-[calc(100%-40px)]">
				<Sidebar />
				<ResizablePanelGroup
					direction="horizontal"
					autoSaveId="adev-workspace-layout"
				>
					<ResizablePanel
						defaultSize={20}
						minSize={11}
						className="bg-[#5E2C5A]"
					>
						<WorkspaceSidebar />
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel minSize={20}>{children}</ResizablePanel>
				</ResizablePanelGroup>
			</div>
		</div>
	);
}

export default WorkspaceLayout;
