import { useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { itemsAtom } from "../store/gameStore";
import { isScreenWidthChangedAtom, tabAtom } from "../store/store";
import { levelMap } from "../types/levels";
import ItemCard from "./ItemCard";

const ratio = 0.85;

const Items = () => {
	const items = useAtomValue(itemsAtom);
	const tab = useAtomValue(tabAtom);
	const isScreenWidthChanged = useAtomValue(isScreenWidthChangedAtom);

	const [cardHeight, setCardHeight] = useState(0);

	const filteredItems = useMemo(() => {
		return items.filter((item) => {
			if (tab === "all") {
				return true;
			}

			return levelMap[item.level.toString() as keyof typeof levelMap] === tab;
		});
	}, [items, tab]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: isScreenWidthChanged dependency is required for recalculation
	useEffect(() => {
		const card = document.querySelector(".itemCard");
		if (card) {
			const width = card.clientWidth;
			const height = width * ratio;
			setCardHeight(height);
		}
	}, [isScreenWidthChanged]);

	return (
		<div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto no-scrollbar">
			{filteredItems.map((item) => (
				<ItemCard
					key={item.id || (item as any)._id}
					item={item}
					cardHeight={cardHeight}
				/>
			))}
		</div>
	);
};

export default Items;
