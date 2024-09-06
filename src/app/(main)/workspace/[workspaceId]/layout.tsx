"use client";

import React from "react";
import Toolbar from "./toolbar";
import Sidebar from "./sidebar";

type Props = {
	children: React.ReactNode;
};

function WorkspaceLayout({ children }: Props) {
	return (
		<div className="h-full">
			<Toolbar />
			<div className="flex h-[calc(100%-40px)]">
				<Sidebar />
				{children}
			</div>
		</div>
	);
}

export default WorkspaceLayout;
