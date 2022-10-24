"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThreads = exports.getAllChannels = exports.getChannelById = exports.getChannelByName = void 0;
const discord_js_1 = require("discord.js");
//returns true or false
const getChannelByName = async (channelName, guild) => {
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
const getThreads = async (parent, guild) => {
    //! returns all thread channels
    //    const teststt = await parent.client.channels.cache.get(parent.id)
    // console.log("GETthreadsdsa parentID: ", teststt, " \n getTHREADSguild: ", guild)
    let threads = await parent.threads.cache.filter(x => x.isThread());
    // guild.channels.guild.channels.
    console.log("saDSADBBcBewSADQC ans : ", threads);
    return threads;
};
exports.getThreads = getThreads;
