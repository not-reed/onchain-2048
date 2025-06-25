import { Link } from "./primitives/Link";

export function HowToPlay() {
	return (
		<section className="max-w-2xl mx-auto p-4 text-center text-gray-300 grid gap-4">
			<h2 className="font-bold text-lg">What is this?</h2>
			<p>
				This is a fully onchain, multiplayer version of 2048 — where anyone can
				join a shared room and play live with others. Every move is a
				transaction onchain, so the game state is trustless, persistent, and
				visible to anyone. There’s no server, no backend — just smart contracts,
				a UI, and chaos. It’s a fun showcase of what’s possible with onchain
				games: real-time collaboration, permissionless access, and{" "}
				<Link href="https://github.com/not-reed/onchain-2048">
					fully open source code.
				</Link>
			</p>

			<h2 className="font-bold text-lg">How to play:</h2>
			<p>
				Pick or create a room (it defaults to{" "}
				<span className="text-yellow-500 font-bold">happychain</span>, but feel
				free to pick <span className="text-yellow-500 font-bold">onchain</span>,{" "}
				<span className="text-yellow-500 font-bold">gm</span>, or anything you
				want) — each room has its own shared 2048 board. Then just use arrow
				keys to move tiles. If a merge is possible, it happens — but other
				players might move the board before you do, so every decision is a
				gamble.
			</p>
		</section>
	);
}
