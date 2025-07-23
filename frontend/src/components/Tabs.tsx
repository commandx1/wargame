import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { isScreenWidthChangedAtom } from "../store/store";
import type { Tab } from "../types/tab";
import TabButton from "./TabButton";

const tabValues = [
	{ value: "all", label: "Tüm Seviyeler" },
	{ value: "sv1", label: "Sv1" },
	{ value: "sv2", label: "Sv2" },
	{ value: "maxSv", label: "Max Sv" },
];

const Tabs = () => {
	const setIsScreenWidthChanged = useSetAtom(isScreenWidthChangedAtom);

	useEffect(() => {
		window.addEventListener("resize", () => {
			setIsScreenWidthChanged((prev) => !prev);
		});

		return () => {
			window.removeEventListener("resize", () => {});
		};
	}, [setIsScreenWidthChanged]);

	return (
		<div className="w-full p-1 rounded-full outline outline-[3.09px] outline-white/30 inline-flex justify-center items-center">
			{tabValues.map((tab) => (
				<TabButton key={tab.value} value={tab.value as Tab}>
					{tab.label}
				</TabButton>
			))}
		</div>
	);
};

export default Tabs;
