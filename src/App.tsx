import React, { useState } from "react";
import { type Bookmark, useBookmarks } from "./hooks/useBookmarks";
import BookmarkList from "./components/BookmarkList";
import SearchBar from "./components/SearchBar";
import Fuse from "fuse.js";

const App: React.FC = () => {
	const { bookmarks, loading } = useBookmarks();
	const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");

	React.useEffect(() => {
		setSelectedIndex(0);
	}, [searchTerm, setSelectedIndex]);

	const fuse = new Fuse(bookmarks, {
		keys: ["title"],
	});

	React.useEffect(() => {
		setFilteredBookmarks(bookmarks);
	}, [bookmarks]);

	const filterBookmarks = (searchTerm: string) => {
		setSearchTerm(searchTerm);
		if (searchTerm === "" || !searchTerm) {
			setFilteredBookmarks(bookmarks);
			return;
		}

		setFilteredBookmarks(fuse.search(searchTerm).map((result) => result.item));
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setSelectedIndex((prev) => (prev + 1) % filteredBookmarks.length);
				break;
			case "ArrowUp":
				e.preventDefault();
				setSelectedIndex(
					(prev) =>
						(prev - 1 + filteredBookmarks.length) % filteredBookmarks.length,
				);
				break;
			case "Enter":
				e.preventDefault();
				if (filteredBookmarks[selectedIndex]) {
					openInNewTab(filteredBookmarks[selectedIndex]);
				}
				break;
		}
	};

	const openInNewTab = (bookmark: Bookmark) => {
		if (chrome?.tabs) {
			chrome.tabs.create({ url: bookmark.url });
		} else {
			console.warn("Chrome API not available. Opening in current tab.");
			window.open(bookmark.url, "_blank");
		}
	};

	return (
		<div className="w-[500px] h-[500px] bg-gray-900 p-2 m-4 rounded">
			<SearchBar
				setSearchTerm={filterBookmarks}
				total={bookmarks.length}
				selected={filteredBookmarks.length}
				keyDown={handleKeyDown}
			/>
			{loading ? (
				<p>Chargement des favoris...</p>
			) : (
				<BookmarkList
					bookmarks={filteredBookmarks}
					selectedIndex={selectedIndex}
				/>
			)}
		</div>
	);
};

export default App;
