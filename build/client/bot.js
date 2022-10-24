"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
require('dotenv').config();
const discord_js_1 = require("discord.js");
const channel_1 = require("../commands/helpers/channel");
const CommandHandler_1 = require("../handlers/CommandHandler");
let prefix = '.';
const token = `${process.env.TOKEN}`;
const clientIntents = [
    discord_js_1.GatewayIntentBits.
        MessageContent,
    discord_js_1.GatewayIntentBits.
        GuildPresences,
    discord_js_1.GatewayIntentBits.Guilds,
    discord_js_1.GatewayIntentBits.GuildMessages,
    discord_js_1.GatewayIntentBits.GuildMembers
];
//! convert to typescript
const getThreadNames = async (parentId, message, interaction) => {
    const guild = message.guild;
    const textChannel = await (0, channel_1.getChannelById)(exports.client, parentId);
    console.log("PARENdTTdsTTSS: ", textChannel.name);
    //! returns all threads in selected text channel
    const threads = await (0, channel_1.getThreads)(textChannel, guild);
    console.log("TEHREADSSSSbcb: ", threads);
    //! returns new array with threads data
    const threadsArr = threads.map((thread, key) => {
        return {
            label: thread.name,
            description: 'This is a thread!',
            value: thread.id
        };
    });
    // ! spreads new threads array and turns them into selections
    const row = new discord_js_1.ActionRowBuilder()
        .addComponents(new discord_js_1.SelectMenuBuilder()
        .setCustomId('thread_select')
        .setPlaceholder(`Select thread in channel ${textChannel.name}`)
        .addOptions(...threadsArr));
    interaction.reply({ components: [row], ephemeral: true });
};
const getChannelNames = (textChannels, message) => {
    //! returns new array with channel data
    const channelsArr = textChannels.map((channel, key) => {
        return {
            label: channel.name,
            description: 'This is a description',
            value: channel.id
        };
    });
    return channelsArr;
};
exports.client = new discord_js_1.Client({ intents: clientIntents });
exports.client.on('interactionCreate', async (interaction) => {
    //  console.log("interaction: ", (await interaction.channel?.messages.fetch({ limit: 1 })))
    // if (!interaction.isSelectMenu()) return;
    // console.log(interaction)
    // if(!interaction.isSelectMenu()){
    // 	console.log('aaa')
    // 	repliedTo = (await interaction.channel?.messages.cache.last()?.fetchReference())?.content 
    // }
    if (interaction.isSelectMenu())
        switch (interaction.customId) {
            case "channel_select":
                const repliedTo = await interaction.channel?.messages.cache.last()?.fetchReference();
                const parentId = interaction.values[0];
                // const parent = await interaction.client.channels.fetch(parentId) as Channel
                console.log("SABFYDUASuio: ");
                getThreadNames(parentId, repliedTo, interaction);
                break;
            //! once thread from menu is selected
            case "thread_select":
                const threadId = interaction.values[0];
                const thread = await interaction.client.channels.fetch(threadId);
                const lastMsg = await (await interaction.channel?.messages.cache.last()?.fetchReference())?.fetchReference();
                const channelSelect = await interaction.channel?.messages.cache.last()?.fetchReference();
                //! if last message is a thread select menu replace it
                // console.log("last message: ", lastMsg.components, lastMsg.content)
                // , "\n interaction: ", interaction
                thread.send({ content: lastMsg.content });
                const threadEmbed = new discord_js_1.EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(`${thread.name}`)
                    .setURL(`https://discord.com/channels/${thread.guildId}/${thread.id}`)
                    .setDescription(`Message added to ${thread.name}!`)
                    .setTimestamp();
                interaction.reply({ embeds: [threadEmbed], ephemeral: true });
                channelSelect.delete();
                lastMsg.delete();
                // interaction.reply(`chose thread: ${interaction.}`)
                break;
            default: interaction.reply("error");
        }
});
exports.client.on("messageCreate", async (message) => {
    if (message.author.bot)
        return;
    const guildId = message.guildId;
    let guild = exports.client.guilds.cache.get(guildId);
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift()?.toLowerCase();
        (0, CommandHandler_1.CommandHandler)(exports.client, message, command);
    }
    const textChannels = await (0, channel_1.getAllChannels)(exports.client, guild);
    if (textChannels) {
        let counter = 0;
        const channelsArr = await getChannelNames(textChannels, message);
        // ! spreads new channel array and turns them into selections
        const row = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.SelectMenuBuilder()
            .setCustomId('channel_select')
            .setPlaceholder('Nothing Selected')
            .addOptions(...channelsArr));
        await message.reply({ content: "Select a notes channel.", components: [row] });
    }
    console.log("no");
});
//always last line
exports.client.login(token);
