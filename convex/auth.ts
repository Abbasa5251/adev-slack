import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { ConvexError } from "convex/values";
import { z } from "zod";
import { DataModel } from "./_generated/dataModel";

const ParamsSchema = z.object({
	name: z.string().max(50),
	email: z.string().email(),
	password: z.string().min(3).max(50),
});

const CustomPassword = Password<DataModel>({
	profile(params) {
		const { error, data } = ParamsSchema.safeParse(params);
		if (error) {
			throw new ConvexError(error.format());
		}
		return { name: data.name, email: data.email };
	},
});

export const { auth, signIn, signOut, store } = convexAuth({
	providers: [CustomPassword],
});
