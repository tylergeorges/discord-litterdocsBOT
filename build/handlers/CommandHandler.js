"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const newNotes_1 = require("../commands/newNotes");
const channel_1 = require("../commands/helpers/channel");
//! Handles incoming commands
const CommandHandler = async (client, message, command) => {
    const categoryName = "NOTES";
    const guildId = message.guildId;
    const guild = client.guilds.cache.get(guildId);
    switch (command) {
        case 'new_notes':
            //! splits channel name from command 
            const channelName = `📝${message.content.split(command)[1].trim()}`;
            const channelExists = await (0, channel_1.getChannelByName)(client, channelName, guild);
            !channelExists ?
                (0, newNotes_1.newNotes)(client, message, channelName, categoryName)
                :
                    await message.channel.send("Channel already exists!");
            break;
        default: await message.channel.send("Error");
    }
};
exports.CommandHandler = CommandHandler;
