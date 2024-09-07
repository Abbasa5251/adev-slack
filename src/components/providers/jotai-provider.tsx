"use client";

import { ReactNode } from "react";
import { Provider } from "jotai";

interface Props {
	children: ReactNode;
}

export function JotaiProvider({ children }: Props) {
	return <Provider>{children}</Provider>;
}
