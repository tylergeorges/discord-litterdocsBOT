const {newNotes} = require('../commands/newNotes')
const {findChannel} = require('../commands/helpers/channel')


//! Handles incoming commands
const CommandHandler = async (client, message, command) =>{
    const categoryName = "NOTES"

    switch(command){
        case 'new_notes':
        
            //! splits channel name from command 
            const channelName = `📝${message.content.split(command)[1].trim()}`

            const channelExists = await findChannel(client, channelName)

             !channelExists ?
             
             newNotes(client, message, channelName, categoryName) 
             : 
             await message.channel.send("Channel already exists!")

        break;

        
        default: await message.channel.send("Error")
    }

}

module.exports = { CommandHandler }