import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";
import { IconType } from "react-icons/lib";

interface Props {
	icon: LucideIcon | IconType;
	label: string;
	isActive?: boolean;
}

function SidebarButton({ icon: Icon, label, isActive }: Props) {
	return (
		<div className="flex flex-col justify-center items-center gap-y-0.5 cursor-pointer group">
			<Button
				variant={"transparent"}
				className={cn(
					"size-9 p-2 group-hover:bg-accent/20",
					isActive && "bg-accent/20"
				)}
			>
				<Icon
					className={cn(
						"size-5 group-hover:scale-110 stroke-white transition-all"
					)}
				/>
			</Button>
			<span className="text-white text-xs group-hover:text-accent">
				{label}
			</span>
		</div>
	);
}

export default SidebarButton;
