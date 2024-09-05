import type React from "react";

interface SearchBarProps {
	total: number;
	selected: number;
	setSearchTerm: (term: string) => void;
	keyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
	setSearchTerm,
	total,
	selected,
	keyDown,
}) => {
	return (
		<div className="w-full border border-gray-500 p-2">
			<label
				className="relative z-0 flex items-center justify-between"
				htmlFor="search"
			>
				<h1 className="absolute z-10 -top-4 text-white bg-gray-900 text font-bold px-2">
					Find Bookmarks
				</h1>
				<span className="text-white">{">"}</span>
				<input
					type="text"
					placeholder=""
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full p-2 focus:ring-0 focus:outline-none bg-gray-900 text-white"
					autoFocus
					onKeyDown={keyDown}
				/>
				<span className="text-gray-400 text-xs w-12 text-right">
					{selected} / {total}
				</span>
			</label>
		</div>
	);
};

export default SearchBar;
