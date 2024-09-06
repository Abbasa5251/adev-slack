import UserButton from "@/components/auth/user-button";
import React from "react";
import WorkspaceSwitcher from "./workspace-switcher";
import SidebarButton from "./sidebar-button";
import { Home, MessageSquare, Bell, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";

type Props = {};

function Sidebar({}: Props) {
	const pathname = usePathname();

	return (
		<aside className="bg-[#481349] h-full w-[70px] flex flex-col gap-y-4 items-center pt-[9px] pb-[4px]">
			<WorkspaceSwitcher />
			<SidebarButton
				icon={Home}
				label="Home"
				isActive={pathname.includes("/workspace")}
				// isActive={false}
			/>
			<SidebarButton icon={MessageSquare} label="DMs" />
			<SidebarButton icon={Bell} label="Activity" />
			<SidebarButton icon={MoreHorizontal} label="More" />
			<div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
				<UserButton />
			</div>
		</aside>
	);
}

export default Sidebar;
