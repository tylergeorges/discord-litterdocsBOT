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
const getThreadNames = async (parentId, interaction) => {
    const guild = interaction.guild;
    const parentChannel = await (0, channel_1.getChannelById)(exports.client, parentId);
    const threads = await (0, channel_1.getThreads)(parentId, guild);
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
        .setPlaceholder(`Select thread in channel ${parentChannel.name}`)
        .addOptions(...threadsArr));
    interaction.reply({ components: [row] });
};
const getChannelNames = (textChannels, message) => {
    //! returns new array with channel data
    const channelsArr = textChannels.map((channel, key) => {
        console.log(channel);
        return {
            label: channel.name,
            description: 'This is a description',
            value: channel.id
        };
    });
    // ! spreads new channel array and turns them into selections
    const row = new discord_js_1.ActionRowBuilder()
        .addComponents(new discord_js_1.SelectMenuBuilder()
        .setCustomId('channel_select')
        .setPlaceholder('Nothing Selected')
        .addOptions(...channelsArr));
    message.channel.send({ content: "Select a notes channel.", components: [row] });
};
exports.client = new discord_js_1.Client({ intents: clientIntents });
exports.client.on('interactionCreate', async (interaction) => {
    if (!interaction.isSelectMenu())
        return;
    switch (interaction.customId) {
        case "channel_select":
            const parentId = interaction.values[0];
            const parent = interaction.client.channels.fetch(parentId);
            getThreadNames(parentId, interaction);
            break;
        case "thread_select":
            const lastMsgID = interaction.channel?.lastMessageId;
            const lastMsg = interaction.channel?.messages.fetch(lastMsgID);
            console.log("last message: ", lastMsg, "\n interaction: ", interaction.);
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
    // textChannels.map
    if (textChannels) {
        let counter = 0;
        await getChannelNames(textChannels, message);
        // message.channel.send(`> Channels ${await getChannelNames(textChannels)}`)
        // message.channel.send(`> Channels ${await getChannelNames(textChannels)}`)
    }
    console.log("no");
});
//always last line
exports.client.login(token);
