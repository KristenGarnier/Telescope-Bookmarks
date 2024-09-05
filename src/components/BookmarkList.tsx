import type React from "react";
import type { Bookmark } from "../hooks/useBookmarks";

interface BookmarkListProps {
	bookmarks: Bookmark[];
	selectedIndex: number;
}

const BookmarkList: React.FC<BookmarkListProps> = ({
	bookmarks,
	selectedIndex,
}) => {
	return (
		<ul className="w-full h-[415px] overflow-auto border border-gray-500 mt-4 p-2">
			{bookmarks.map((bookmark, index) => (
				<li key={bookmark.id} className="mb-1 focus:ring-0 focus:outline-none">
					<a
						href={bookmark.url}
						target="_blank"
						rel="noopener noreferrer"
						className={`flex items-center truncate text-gray-400 focus:text-white hover:text-white focus:ring-0 focus:outline-none focus:font-bold focus:bg-gray-800 rounded ${selectedIndex === index ? "bg-gray-800 text-white font-bold" : ""} `}
					>
						<img
							src={`https://www.google.com/s2/favicons?domain=${bookmark.url}`}
							width={16}
							height={16}
							alt="favicon of the website"
							className="mr-2"
							loading="lazy"
						/>
						{bookmark.title}
					</a>
				</li>
			))}
		</ul>
	);
};

export default BookmarkList;
