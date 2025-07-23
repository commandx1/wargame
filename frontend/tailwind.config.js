/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				galano: [
					"Galano Grotesque",
					"Galano Grotesque Alt",
					"system-ui",
					"sans-serif",
				],
				"galano-alt": [
					"Galano Grotesque Alt",
					"Galano Grotesque",
					"system-ui",
					"sans-serif",
				],
				"galano-grotesque": [
					"Galano Grotesque",
					"Galano Grotesque Alt",
					"system-ui",
					"sans-serif",
				],
			},
		},
	},
	plugins: [],
};
