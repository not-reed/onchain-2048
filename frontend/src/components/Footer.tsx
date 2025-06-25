import { cn } from "../utils/cn";
import { Link } from "./primitives/Link";

export function Footer() {
	return (
		<div className={cn("text-sm text-center text-slate-400 p-4")}>
			An onchain experiment by
			<Link href="https://x.com/0x_reed"> @0x_reed </Link>
			<br />
			Build on
			<Link href="https://x.com/HappyChainDevs"> @HappyChainDevs </Link>
		</div>
	);
}
