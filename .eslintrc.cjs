'use strict';

module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended'
	],
	plugins: ['@typescript-eslint'],
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		'no-undef': 'off',
		'object-curly-spacing': ['error', 'never'],
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],
		'svelte/html-quotes': ['error', {'prefer': 'single'}]
	}
};
