import { Client, GatewayIntentBits, AnyThreadChannel, PublicThreadChannel, Message, ThreadChannel, Channel, GuildChannel, TextChannel, Guild, ChannelType, GuildBasedChannel, Collection, TextBasedChannel, ThreadManager, AllowedThreadTypeForTextChannel} from  'discord.js'

//returns true or false
export const getChannelByName = async (channelName: string, guild: Guild): Promise<AnyThreadChannel>=>{
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

export const getThreads =  async (parent: TextChannel, guild: Guild):  Promise< Collection<string, ThreadChannel>>  =>{
    //! returns all thread channels

//    const teststt = await parent.client.channels.cache.get(parent.id)

   
    // console.log("GETthreadsdsa parentID: ", teststt, " \n getTHREADSguild: ", guild)
    let threads =  await parent.threads.cache.filter(x => x.isThread())
    
    // guild.channels.guild.channels.
    console.log("saDSADBBcBewSADQC ans : ",  threads)
    
    return threads
}