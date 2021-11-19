const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('helps a poor, clueless soul.'),
	async execute(interaction) {
		await interaction.reply('use menu/[dining hall] [time] to see the menu!');
	},
};
