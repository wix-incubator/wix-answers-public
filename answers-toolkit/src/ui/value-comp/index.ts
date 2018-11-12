export type ValueCompProps<T, M = {}> = {
	value: T,
	onChange: (value: T) => void
} & M;
