"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
require('dotenv').config();
const discord_js_1 = require("discord.js");
const channel_1 = require("../commands/helpers/channel");
const CommandHandler_1 = require("../handlers/CommandHandler");
const exampleEmbed = {
    color: 0x0099ff,
    title: 'Channels',
    description: 'All Channels',
    fields: [
        {
            name: 'Regular field title',
            value: 'Some value here',
        },
        {
            name: '\u200b',
            value: '\u200b',
            inline: false,
        },
        {
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        },
        {
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        },
        {
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        },
    ],
    image: {
        url: 'https://i.imgur.com/AfFp7pu.png',
    },
    timestamp: new Date().toISOString(),
    footer: {
        text: 'Some footer text here',
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
    },
};
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
const getChannelNames = (textChannels) => {
    let counter = 1;
    return textChannels.map((channel, key) => {
        // return `\n [${counter++}]${channel.name} \n`
        exampleEmbed.fields.push({ name: `${counter}`, value: channel.name, inline: true });
    });
};
exports.client = new discord_js_1.Client({ intents: clientIntents });
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
        await getChannelNames(textChannels);
        // message.channel.send(`> Channels ${await getChannelNames(textChannels)}`)
        message.channel.send({ embeds: [exampleEmbed] });
        // message.channel.send(`> Channels ${await getChannelNames(textChannels)}`)
    }
    console.log("no");
});
//always last line
exports.client.login(token);
