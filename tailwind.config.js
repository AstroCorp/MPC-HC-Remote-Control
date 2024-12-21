/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			fontFamily: {
				"RobotoBlack": ["RobotoBlack"],
				"RobotoBlackItalic": ["RobotoBlackItalic"],
				"RobotoBold": ["RobotoBold"],
				"RobotoBoldItalic": ["RobotoBoldItalic"],
				"RobotoItalic": ["RobotoItalic"],
				"RobotoLight": ["RobotoLight"],
				"RobotoLightItalic": ["RobotoLightItalic"],
				"RobotoMedium": ["RobotoMedium"],
				"RobotoMediumItalic": ["RobotoMediumItalic"],
				"RobotoRegular": ["RobotoRegular"],
				"RobotoThin": ["RobotoThin"],
				"RobotoThinItalic": ["RobotoThinItalic"],
			},
		},
	},
	plugins: [],
}