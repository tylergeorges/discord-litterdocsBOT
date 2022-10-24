"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newNotes = void 0;
const discord_js_1 = require("discord.js");
const category_1 = require("./helpers/category");
const channel_1 = require("./helpers/channel");
//* creates new notes text channel
const newNotes = async (client, message, channelName, categoryName) => {
    const guildId = message.guildId;
    let guild = client.guilds.cache.get(guildId);
    //! when first creating notes channel, Category is the NOTES category which has all text channels 
    const category = await (0, category_1.getCategory)(guild, message, categoryName);
    console.log("channelNamechannelName: ", channelName);
    //* creates text channel
    await guild?.channels.create({ name: channelName, type: discord_js_1.ChannelType.GuildText, parent: category?.id })
        .then(async (data) => {
        //* finds created channel
        const channel = await (0, channel_1.getChannelById)(client, data.id);
        //* creates thread upon creation of channel
        const newThread = await channel.threads.create({ name: 'section-1' });
        console.log("newThreadnewThread section-1: ", newThread);
    })
        .catch(console.error);
    //! if channel creation was successful
    await message.channel.send("Notes Channel Created!");
};
exports.newNotes = newNotes;
