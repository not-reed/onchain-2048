import { cva, type VariantProps } from "cva";
import { type AnchorHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

const anchorVariants = cva(["transition font-semibold"], {
	variants: {
		variant: {
			teal: ["text-teal-400 hover:text-teal-600 hover:underline"],
		},
	},
	defaultVariants: {
		variant: "teal",
	},
});

export interface AnchorProps
	extends AnchorHTMLAttributes<HTMLAnchorElement>,
		VariantProps<typeof anchorVariants> {}

export const Link = forwardRef<HTMLAnchorElement, AnchorProps>(
	({ className, variant = "teal", ...rest }, ref) => {
		return (
			<a
				ref={ref}
				className={cn(anchorVariants({ variant, className }))}
				{...rest}
			/>
		);
	},
);
