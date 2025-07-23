import { useAtom } from "jotai";
import type React from "react";
import { sounds } from "../audio";
import { tabAtom } from "../store/store";
import type { Tab } from "../types/tab";

const TabButton = ({
	children,
	value,
}: {
	children: React.ReactNode;
	value: Tab;
}) => {
	const [tab, setTab] = useAtom(tabAtom);

	const isActive = tab === value;

	const handleClick = () => {
		setTab(value);
		sounds.menuClick.play();
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className={`cursor-pointer flex-1 rounded-full p-1 text-xs flex justify-center items-center transition-all duration-200 ${isActive ? "shadow-[inset_0px_4.6332573890686035px_0px_0px_rgba(255,255,255,0.55)] bg-orange-300 text-slate-900 font-bold" : "opacity-50 text-white font-semibold"}`}
		>
			{children}
		</button>
	);
};

export default TabButton;
