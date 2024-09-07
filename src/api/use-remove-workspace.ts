import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useCallback, useMemo, useState } from "react";

type RequestType = { id: Id<"workspaces"> };
type ResponseType = Id<"workspaces"> | null;

type Options = {
	onSuccess?: (data: ResponseType) => void;
	onError?: (error: Error) => void;
	onSettled?: () => void;
	throwOnError?: boolean;
};

export const useRemoveWorkspace = () => {
	const [data, setData] = useState<ResponseType>(null);
	const [error, setError] = useState<Error | null>(null);
	const [status, setStatus] = useState<
		"pending" | "success" | "error" | "settled" | null
	>(null);

	const isPending = useMemo(() => status === "pending", [status]);
	const isSuccess = useMemo(() => status === "success", [status]);
	const isError = useMemo(() => status === "error", [status]);
	const isSettled = useMemo(() => status === "settled", [status]);

	const mutation = useMutation(api.workspaces.remove);

	const mutate = useCallback(
		async (values: RequestType, options?: Options) => {
			try {
				setData(null);
				setError(null);

				setStatus("pending");

				const response = await mutation(values);
				setData(response);
				setStatus("success");
				options?.onSuccess?.(response);
				return response;
			} catch (error) {
				setError(error as Error);
				setStatus("error");
				options?.onError?.(error as Error);
				if (options?.throwOnError) {
					throw error;
				}
			} finally {
				setStatus("settled");
				options?.onSettled?.();
			}
		},
		[mutation]
	);

	return {
		mutate,
		data,
		error,
		isPending,
		isError,
		isSuccess,
		isSettled,
	};
};
