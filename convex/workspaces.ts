import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
	args: {
		name: v.string(),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User is not authenticated");
		}
		const joinCode = "123456";
		const workspaceId = await ctx.db.insert("workspaces", {
			name: args.name,
			userId: userId,
			joinCode: joinCode,
		});
		return workspaceId;
	},
});

export const get = query({
	args: {},
	handler: async (ctx) => {
		const workspaces = await ctx.db.query("workspaces").collect();
		return workspaces;
	},
});

export const getById = query({
	args: {
		id: v.id("workspaces"),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User is not authenticated");
		}
		return await ctx.db.get(args.id);
	},
});
