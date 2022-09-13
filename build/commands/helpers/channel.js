"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThreads = exports.getAllChannels = exports.getChannelById = exports.getChannelByName = void 0;
const discord_js_1 = require("discord.js");
//returns true or false
const getChannelByName = async (client, channelName, guild) => {
    //finds and returns channel from channel name
    let channel = guild.channels.cache.find((channel) => channel.name == channelName);
    return channel;
};
exports.getChannelByName = getChannelByName;
const getChannelById = async (client, channelId) => {
    //! finds and returns created text channel from channel id
    let channel = await client.channels.cache.get(channelId);
    return channel;
};
exports.getChannelById = getChannelById;
const getAllChannels = async (client, guild) => {
    //! returns all thread channels
    let channels = await guild.channels.cache.filter(channel => channel.type == discord_js_1.ChannelType.GuildText && channel.parent?.name == "NOTES");
    return channels;
};
exports.getAllChannels = getAllChannels;
const getThreads = async (parentId, guild) => {
    //! returns all thread channels
    let threads = await guild.channels.cache.filter(channel => channel.isThread() && channel.parentId == parentId);
    return threads;
};
exports.getThreads = getThreads;
