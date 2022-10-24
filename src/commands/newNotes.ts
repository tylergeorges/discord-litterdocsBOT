import {ChannelType, Client, Guild, Message} from 'discord.js'
import { getCategory } from './helpers/category'
import { getChannelById, }  from './helpers/channel'


//* creates new notes text channel
export const newNotes = async (client: Client, message: Message, channelName: string, categoryName: string) =>{

        const guildId = message.guildId as string

        let guild:Guild  = client.guilds.cache.get(guildId) as Guild

        //! when first creating notes channel, Category is the NOTES category which has all text channels 
        const category = await getCategory(guild, message, categoryName)

        console.log("channelNamechannelName: ", channelName)

        //* creates text channel
       await guild?.channels.create({ name: channelName,  type: ChannelType.GuildText,  parent: category?.id })
        .then(async (data) => {
     
            //* finds created channel
            const channel = await getChannelById(client, data.id)


            //* creates thread upon creation of channel
           const newThread = await channel.threads.create({ name: 'section-1'})

           console.log("newThreadnewThread section-1: ", newThread)
        })
        .catch(console.error)

        
        //! if channel creation was successful
       await message.channel.send("Notes Channel Created!")

}