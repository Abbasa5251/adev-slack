"use client";

import { useEffect, useMemo } from "react";
import { useGetWorkspaces } from "@/api/use-get-workspaces";

import UserButton from "@/components/auth/user-button";
import { useCreateWorkspaceModal } from "@/store/use-create-workspace-modal";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	const [open, setOpen] = useCreateWorkspaceModal();
	const { data, isLoading } = useGetWorkspaces();

	const workspaceId = useMemo(() => {
		return data?.[0]?._id;
	}, [data]);

	useEffect(() => {
		if (isLoading) return;

		if (workspaceId) {
			router.replace(`/workspace/${workspaceId}`);
		} else if (!open) {
			setOpen(true);
		}
	}, [workspaceId, isLoading, open, setOpen, router]);

	return <UserButton />;
}
