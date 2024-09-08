import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import React from "react";

const userItemVariants = cva(
	"flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden",
	{
		variants: {
			variant: {
				default: "text-[#F9edffcc]",
				active: "text-[#4B1349] bg-white/90 hover:bg-white/90",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

type Props = {
	id: Id<"members">;
	label?: string;
	image?: string;
	variant?: VariantProps<typeof userItemVariants>["variant"];
};

function UserItem({ id, label = "Member", image, variant }: Props) {
	const workspaceId = useWorkspaceId();
	const avatarFallback = label.charAt(0).toUpperCase();

	return (
		<Button
			variant="transparent"
			className={cn(userItemVariants({ variant: variant }))}
			size="sm"
			asChild
		>
			<Link href={`/workspace/${workspaceId}/member/${id}`}>
				<Avatar className="size-5 rounded-sm mr-1">
					<AvatarImage className="rounded-sm" src={image} />
					<AvatarFallback className="rounded-sm bg-sky-500 text-white text-xs">
						{avatarFallback}
					</AvatarFallback>
				</Avatar>
				<span className="text-sm truncate">{label}</span>
			</Link>
		</Button>
	);
}

export default UserItem;
