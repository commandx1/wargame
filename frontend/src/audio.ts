import { Howl } from "howler";

export const sounds = {
	menuClick: new Howl({ src: ["/sounds/menu-click.mp3"] }),
	itemClick: new Howl({ src: ["/sounds/item-click.mp3"] }),
	levelUp: new Howl({ src: ["/sounds/level-up.mp3"] }),
};
