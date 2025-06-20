import clsx from "clsx";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const ChaosButton = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, className, type = "button", ...rest }, ref) => {
		return (
			<div
				className={clsx(
					"relative inline-block hover:scale-105 hover:-rotate-2 transition",
				)}
			>
				{/* Actual button */}
				<button
					ref={ref}
					type={type}
					className={clsx(
						"relative peer",
						"bg-white text-black border border-black ",
						"px-4 py-2 ",
						"transition-transform",

						"active:translate-x-[1px] active:translate-y-[1px]",
						"active:skew-x-[5deg] active:skew-y-[4deg]",
						className,
					)}
					{...rest}
				>
					{children}
				</button>

				{/* Shadow */}
				<div
					className={clsx(
						"absolute inset-0",
						"bg-black",
						"translate-x-[8px] translate-y-[12px]",
						"skew-x-[-15deg] skew-y-[-4deg]",
						"transition-transform",
						"rounded-none",
						"z-[-1]",
						"peer-active:translate-x-[6px] peer-active:translate-y-[14px]",
						"peer-active:skew-x-[-5deg] peer-active:skew-y-[6deg]",
						"pointer-events-none",
					)}
				/>
			</div>
		);
	},
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, type = "button", ...rest }, ref) => {
		return (
			<button
				ref={ref}
				type={type}
				className={clsx(
					"px-4 py-2 rounded transition",
					"cursor-pointer bg-blue-500 text-white",
					"cursor-pointer hover:bg-blue-700 text-white",
					"disabled:cursor-not-allowed disabled:bg-blue-500/50 disabled:text-gray-400",
				)}
				{...rest}
			>
				{children}
			</button>
		);
	},
);

export const GameButton = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, type = "button", ...rest }, ref) => {
		return (
			<button
				ref={ref}
				type={type}
				className={clsx(
					"cursor-pointer aspect-square px-2 py-1.5 text-xl font-bold rounded-lg transition",
					"border border-gray-500",
					"bg-gray-600 text-gray-100",
					"hover:bg-gray-700",
					"active:rotate-[360deg]",
					"duration-500",
				)}
				{...rest}
			>
				<span>{children}</span>
			</button>
		);
	},
);
