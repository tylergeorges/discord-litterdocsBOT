import { Guild, Message } from 'discord.js';
import { Client } from 'discord.js';
import {ChannelType} from 'discord.js'


export const createCategory = async ( message, categoryName) =>{

    console.log("message:", message, categoryName)
    try{
        const newChannel = await message.guild.channels.create(
             { 
              name: categoryName, 
              type: ChannelType.GuildCategory,  
             })


        const newChannelData = {
            exists: true,
            id:newChannel.id
        } 


        return  newChannelData
        
    }
    catch(e){
        console.error(e)
    }
   

}


//if category exists returns the id else it makes the category and returns the id and that it exists
export const getCategory =  async (guild: Guild, message: Message, categoryName: string) =>{

    const category = await guild.channels.cache.find(category => category.name == categoryName)
    
    console.log("AAAAAAA \n",  message, "AAAAAAA categordyNAmeees: ",categoryName)
    
    console.log("\n category: " + category)
    const msg = message

    if(category){ 
        return  {exists: true, id: category.id}
    }
    else {
        return await createCategory(msg, categoryName)
    }
}
