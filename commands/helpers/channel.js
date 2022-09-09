

//returns true or false
const findChannel = async (client, channelName) =>{
    //finds and returns channel from channel name
    return await client.channels.cache.find(channel => channel.name == channelName)
}

module.exports = {findChannel}