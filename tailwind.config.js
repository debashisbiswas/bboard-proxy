/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
    // https://github.com/tailwindlabs/tailwindcss/pull/8394
    future: {
        hoverOnlyWhenSupported: true
    }
};
