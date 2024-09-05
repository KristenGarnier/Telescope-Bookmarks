import { useState, useEffect } from "react";

export interface Bookmark {
	id: string;
	title: string;
	url: string;
}

export const useBookmarks = () => {
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		chrome.bookmarks.getTree((bookmarkTreeNodes) => {
			const flattenBookmarks = (
				nodes: chrome.bookmarks.BookmarkTreeNode[],
				parent: chrome.bookmarks.BookmarkTreeNode | undefined = undefined,
			): Bookmark[] => {
				return nodes.reduce((acc: Bookmark[], node) => {
					if (node.url) {
						acc.push({
							id: node.id,
							title: parent
								? `${parent.title} / ${node.title}`
								: `${node.title}`,
							url: node.url,
						});
					}
					if (node.children) {
						acc.push(...flattenBookmarks(node.children, node));
					}
					return acc;
				}, []);
			};

			const allBookmarks = flattenBookmarks(bookmarkTreeNodes);
			setBookmarks(allBookmarks);
			setLoading(false);
		});
	}, []);

	return { bookmarks, loading };
};
