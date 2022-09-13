require('dotenv').config()
import { Client, GatewayIntentBits, ActionRowBuilder, APIActionRowComponent, SelectMenuBuilder, Collection, Guild,GuildBasedChannel, Interaction, AnyComponent, AnyComponentBuilder} from  'discord.js'
import { getAllChannels, getChannelById, getThreads } from '../commands/helpers/channel'
import { CommandHandler } from '../handlers/CommandHandler'



let prefix = '.'
const token  = `${process.env.TOKEN}`

const clientIntents = [
    GatewayIntentBits.
    MessageContent, 
    GatewayIntentBits.
    GuildPresences, 
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.GuildMembers
]

//! convert to typescript

		
const getThreadNames = async (parentId: string, interaction) =>{

	const guild: Guild = interaction.guild!
	const parentChannel = await getChannelById(client, parentId)

	
	const threads = await getThreads(parentId, guild)


	//! returns new array with threads data
	const threadsArr = threads.map((thread, key) =>   {
		return {
			label: thread.name,
			description: 'This is a thread!',
			value: thread.id
		}
		}
		)
	
	// ! spreads new threads array and turns them into selections
	const row:ActionRowBuilder  = new ActionRowBuilder<SelectMenuBuilder>()
		.addComponents(
			new SelectMenuBuilder()
			.setCustomId('thread_select')
			.setPlaceholder(`Select thread in channel ${parentChannel.name}`)
			.addOptions(...threadsArr)
		)

		interaction.reply({components: [row]})


}

const getChannelNames = (textChannels: Collection<string, GuildBasedChannel>, message) =>{


	//! returns new array with channel data
	const channelsArr = textChannels.map((channel, key) =>   {
		console.log(channel)
		return {
			label: channel.name,
			description: 'This is a description',
			value: channel.id
		}
		}
		)
	
	// ! spreads new channel array and turns them into selections
	const row:ActionRowBuilder  = new ActionRowBuilder<SelectMenuBuilder>()
		.addComponents(
			new SelectMenuBuilder()
			.setCustomId('channel_select')
			.setPlaceholder('Nothing Selected')
			.addOptions(...channelsArr)
		)


	message.channel.send({content: "Select a notes channel.", components: [row] })

}



export const client = new Client({ intents: clientIntents })



client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;
	
	
	switch(interaction.customId){
		
		case "channel_select": 
		const parentId = interaction.values[0] 

		const parent = interaction.client.channels.fetch(parentId)

		
		getThreadNames(parentId, interaction)

			
		break;
		
		case "thread_select": 

		const lastMsgID = interaction.channel?.lastMessageId as string

		const lastMsg = interaction.channel?.messages.fetch(lastMsgID)


		console.log("last message: ", lastMsg, "\n interaction: ", interaction.)
		// interaction.reply(`chose thread: ${interaction.}`)
		break;


		default: interaction.reply("error")
	}




})

client.on("messageCreate", async message =>{
    if(message.author.bot) return;

    const guildId = message.guildId as string
    let guild:Guild  = client.guilds.cache.get(guildId) as Guild
    
    if(message.content.startsWith(prefix) ){

        const args = message.content.slice(prefix.length).split(/ +/)
        const command = args.shift()?.toLowerCase() as string

      
        CommandHandler(client, message,command);
    }
       
        const textChannels  = await getAllChannels(client, guild)
        
        // textChannels.map
        if(textChannels){
            let counter = 0

           await getChannelNames(textChannels,message)
            // message.channel.send(`> Channels ${await getChannelNames(textChannels)}`)
			
			
         

            // message.channel.send(`> Channels ${await getChannelNames(textChannels)}`)
        }
    console.log("no")
})

//always last line
client.login(token)