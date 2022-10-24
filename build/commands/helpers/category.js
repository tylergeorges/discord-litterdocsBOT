"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategory = exports.createCategory = void 0;
const discord_js_1 = require("discord.js");
const createCategory = async (message, categoryName) => {
    console.log("message:", message, categoryName);
    try {
        const newChannel = await message.guild.channels.create({
            name: categoryName,
            type: discord_js_1.ChannelType.GuildCategory,
        });
        const newChannelData = {
            exists: true,
            id: newChannel.id
        };
        return newChannelData;
    }
    catch (e) {
        console.error(e);
    }
};
exports.createCategory = createCategory;
//if category exists returns the id else it makes the category and returns the id and that it exists
const getCategory = async (guild, message, categoryName) => {
    const category = await guild.channels.cache.find(category => category.name == categoryName);
    console.log("AAAAAAA \n", message, "AAAAAAA categordyNAmeees: ", categoryName);
    console.log("\n category: " + category);
    const msg = message;
    if (category) {
        return { exists: true, id: category.id };
    }
    else {
        return await (0, exports.createCategory)(msg, categoryName);
    }
};
exports.getCategory = getCategory;
