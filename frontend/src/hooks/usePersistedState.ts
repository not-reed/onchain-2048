import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

export function usePersistedState<T>(
	key: string,
	initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
	const [value, setValue] = useState<T>(() => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(`Error reading localStorage key “${key}”:`, error);
			return initialValue;
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.error(`Error writing to localStorage key “${key}”:`, error);
		}
	}, [key, value]);

	return [value, setValue];
}
