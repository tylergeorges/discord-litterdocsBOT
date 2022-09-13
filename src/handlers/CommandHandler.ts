import {newNotes} from '../commands/newNotes'
import  {getChannelByName} from '../commands/helpers/channel'
import { Client, Guild, Message } from 'discord.js'


//! Handles incoming commands
export const CommandHandler = async (client: Client, message: Message, command: string) =>{
    const categoryName = "NOTES"

    const guildId = message.guildId as string
    
    const guild:Guild  = client.guilds.cache.get(guildId) as Guild


    switch(command){
        case 'new_notes':
        
            //! splits channel name from command 
            const channelName = `📝${message.content.split(command)[1].trim()}`

            const channelExists = await getChannelByName(client, channelName, guild)

             !channelExists ?
             newNotes(client, message, channelName, categoryName) 
             : 
             await message.channel.send("Channel already exists!")

        break;

        
        default: await message.channel.send("Error")
    }

}
