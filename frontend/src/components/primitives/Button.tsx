import { cva, type VariantProps } from "cva";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
	[
		"transition",
		"cursor-pointer",
		"disabled:cursor-not-allowed disabled:text-gray-400",
	],
	{
		variants: {
			variant: {
				blue: [
					"bg-blue-500 hover:bg-blue-700 disabled:bg-blue-500/50",
					"text-white",
				],

				green: [
					"bg-emerald-500 hover:bg-emerald-700 disabled:bg-emerald-500/50",
					"text-slate-700 font-bold",
				],

				orange: [
					"bg-amber-500 hover:bg-amber-700 disabled:bg-amber-500/50",
					"text-slate-700",
				],
				gray: [
					"border border-gray-500",
					"bg-gray-600 text-gray-100",
					"hover:bg-gray-700",
				],
			},
			size: {
				default: "h-10 px-4 py-2",
				square: "aspect-square",
			},
			radius: {
				default: "rounded",
				lg: " rounded-lg",
			},
		},
		defaultVariants: {
			variant: "blue",
			size: "default",
			radius: "default",
		},
	},
);

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, type = "button", ...rest }, ref) => {
		return (
			<button
				ref={ref}
				type={type}
				className={cn(buttonVariants({ variant, size, className }))}
				{...rest}
			/>
		);
	},
);

export const GameButton = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, className, ...rest }, ref) => {
		return (
			<button
				ref={ref}
				type={"button"}
				className={cn(
					buttonVariants({
						variant: "gray",
						size: "square",
						radius: "lg",
						className: [
							className,
							"text-xl font-bold",
							"active:rotate-[360deg]",
							"duration-500",
						],
					}),
				)}
				{...rest}
			>
				<span>{children}</span>
			</button>
		);
	},
);
