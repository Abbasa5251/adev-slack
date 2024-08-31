"use client";

import { type SignInFlow } from "@/lib/types";
import React, { useState } from "react";
import SignInCard from "./sign-in-card";
import SignUpCard from "./sign-up-card";

type Props = {};

function AuthScreen({}: Props) {
	const [state, setState] = useState<SignInFlow>("signIn");
	return (
		<div className="h-full flex items-center justify-center bg-[#5c3B58]">
			<div className="md:h-auto md:w-[420px]">
				{state === "signIn" ? (
					<SignInCard setState={setState} />
				) : (
					<SignUpCard setState={setState} />
				)}
			</div>
		</div>
	);
}

export default AuthScreen;
