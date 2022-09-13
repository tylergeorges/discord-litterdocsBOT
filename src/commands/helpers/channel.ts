import { Client, GatewayIntentBits, AnyThreadChannel, PublicThreadChannel, Message, ThreadChannel, Channel, GuildChannel, TextChannel, Guild, ChannelType, GuildBasedChannel, Collection, TextBasedChannel} from  'discord.js'

//returns true or false
export const getChannelByName = async (client: Client, channelName: string, guild: Guild): Promise<AnyThreadChannel>=>{
    //finds and returns channel from channel name
    let channel = guild.channels.cache.find((channel: GuildBasedChannel) =>  channel.name == channelName) as AnyThreadChannel

    return channel 
}


export const getChannelById = async (client: Client, channelId: string):Promise<TextChannel> => {
    //! finds and returns created text channel from channel id

    let channel =  await client.channels.cache.get(channelId) as TextChannel
    return channel
}

export const getAllChannels = async (client:Client, guild: Guild): Promise<Collection<string, GuildBasedChannel>>  =>{
    //! returns all thread channels


    let channels =  await guild.channels.cache.filter(channel => channel.type == ChannelType.GuildText && channel.parent?.name == "NOTES") 

    return channels
}

export const getThreads = async (client:Client, guild: Guild): Promise<Collection<string, GuildBasedChannel>>  =>{
    //! returns all thread channels


    let threads =  await guild.channels.cache.filter(channel => channel.isThread()) as Collection<string, GuildBasedChannel>

    return threads
}
