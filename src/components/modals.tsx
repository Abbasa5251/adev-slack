"use client";

import React, { useEffect, useState } from "react";
import CreateWorkspaceModal from "./workspaces/create-workspace-modal";

type Props = {};

function Modals({}: Props) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<>
			<CreateWorkspaceModal />
		</>
	);
}

export default Modals;
