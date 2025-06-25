import type { PropsWithChildren } from "react";

export function GameGrid({ children }: PropsWithChildren) {
	return (
		<div className="grid grid-cols-4 justify-center gap-2 shadow-2xl">
			{children}
		</div>
	);
}
