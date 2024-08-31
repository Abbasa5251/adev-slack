"use client";

import React from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Loader, LogOut } from "lucide-react";

import { useCurrentUser } from "@/api/use-current-user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Props = {};

function UserButton({}: Props) {
	const { signOut } = useAuthActions();
	const { data: user, isLoading } = useCurrentUser();

	if (isLoading) {
		return <Loader className="size-4 animate-spin text-muted-foreground" />;
	}

	if (!user) {
		return null;
	}

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger className="outline-none relative">
				<Avatar className="size-10 hover:opacity-75 transition">
					<AvatarImage alt={user.name!} src={user?.image} />
					<AvatarFallback className="bg-sky-500 text-white">
						{user.name!.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center" side="right" className="w-60">
				<DropdownMenuItem onClick={() => signOut()} className="h-10">
					<LogOut className="w-4 h-4 mr-2" />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default UserButton;
