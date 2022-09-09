const {ChannelType} = require('discord.js')
const {findCategory} = require('./helpers/category')


//* creates new notes text channel
const newNotes = async (client, message, channelName, categoryName) =>{
        
        //! when first creating notes channel 
        const category = await findCategory(client, message, categoryName)
        
        //* creates text channel
       await message.guild.channels.create(
            { 
             name: channelName, 
             type: ChannelType.GuildText,  
             parent: category.id
            }
            )
        .then(async (data) => {
           
            const channel = client.channels.cache.get(data.id)

           //* creates thread upon creation of channel
           await channel.threads.create({ name: 'section-1'})
        })
        .catch(console.error)

        //! if channel creation was successful
       await message.channel.send("Notes Channel Created!")

}

module.exports = {newNotes}