
module.exports = {
	title: 'Testpersonbokaren Documentation',
	pagePerSection: true,
	styleguideDir : './docs',
	sections: [
		{
			name: 'Introduction',
			content: 'docs/Introduction.md',
			
		},
				{
					name: 'AddOrUpdateBookingForm',
					content: 'docs/AddOrUpdateBookingForm.md',
					
				},
				{
					name: 'AddOrUpdateGroupForm',
					content: 'docs/AddOrUpdateGroupForm.md',

				},
				{
					name: 'AddOrUpdateUserForm',
					content: 'docs/AddOrUpdateUserForm.md',

				},
				{
					name: 'ConfirmationMessage',
					content: 'docs/ConfirmationMessage.md',

				},
				{
					name: 'ConfirmationQuestion',
					content: 'docs/ConfirmationQuestion.md',

				},
				{
					name: 'Button',
					content: 'docs/Button.md',

				},
				{
					name: 'Navbar',
					content: 'docs/Navbar.md',

				},
			
		
	],
	webpackConfig: (env) => ({
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
				},
			],
		},
		
	}),
};