require('dotenv').config()
import { Client, GatewayIntentBits, ActionRowBuilder, APIActionRowComponent, SelectMenuBuilder, Collection, Guild,GuildBasedChannel, Interaction, AnyComponent, AnyComponentBuilder, Message, APIMessageActionRowComponent, SelectMenuInteraction, ThreadChannel, EmbedBuilder} from  'discord.js'
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

		
const getThreadNames = async (parentId: string, message: Message, interaction: SelectMenuInteraction) =>{
	
	const guild: Guild = message.guild!
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
			const row:ActionRowBuilder<SelectMenuBuilder> = new ActionRowBuilder<SelectMenuBuilder>()
				.addComponents(
					new SelectMenuBuilder()
					.setCustomId('thread_select')
					.setPlaceholder(`Select thread in channel ${parentChannel.name}`)
					.addOptions(...threadsArr)
				)
		
				interaction.reply({components: [row], ephemeral: true})

					
}



const getChannelNames = (textChannels: Collection<string, GuildBasedChannel>, message: Message) =>{


	//! returns new array with channel data
	const channelsArr = textChannels.map((channel, key) =>   
			{
		return 	{
			label: channel.name,
			description: 'This is a description',
			value: channel.id
				}
			}
		)
	
	


	return channelsArr
}



export const client = new Client({ intents: clientIntents })



client.on('interactionCreate', async interaction  => {
	//  console.log("interaction: ", (await interaction.channel?.messages.fetch({ limit: 1 })))
	// if (!interaction.isSelectMenu()) return;
	// console.log(interaction)

	
	
	// if(!interaction.isSelectMenu()){
	// 	console.log('aaa')
	// 	repliedTo = (await interaction.channel?.messages.cache.last()?.fetchReference())?.content 

	// }
	
	
	
	if(interaction.isSelectMenu())
	
	switch(interaction.customId){
		
		case "channel_select": 
		const repliedTo =  await interaction.channel?.messages.cache.last()?.fetchReference() as Message

		const parentId = interaction.values[0]

		const parent = interaction.client.channels.fetch(parentId)

		
		getThreadNames(parentId, repliedTo, interaction)

			
		break;
		
		//! once thread from menu is selected
		case "thread_select": 
		const threadId = interaction.values[0] 
		const thread = await interaction.client.channels.fetch(threadId) as ThreadChannel

		const lastMsg = await (await interaction.channel?.messages.cache.last()?.fetchReference())?.fetchReference() as Message
		
		const channelSelect = await interaction.channel?.messages.cache.last()?.fetchReference() as Message



		console.log(thread, lastMsg)
		
		//! if last message is a thread select menu replace it
		// console.log("last message: ", lastMsg.components, lastMsg.content)
		// , "\n interaction: ", interaction

		thread.send({content: lastMsg.content})
		
		const threadEmbed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle(`${thread.name}`)
		.setURL(`https://discord.com/channels/${thread.guildId}/${thread.id}`)
		.setDescription(`Message added to ${thread.name}!`)
		.setTimestamp()


		interaction.reply({embeds: [threadEmbed], ephemeral: true})
		
		channelSelect.delete()
		lastMsg.delete()
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
        if(textChannels){
            let counter = 0

          const channelsArr = await getChannelNames(textChannels,message)
			



			// ! spreads new channel array and turns them into selections
			const row:ActionRowBuilder<SelectMenuBuilder> = new ActionRowBuilder<SelectMenuBuilder>()
			.addComponents(
				new SelectMenuBuilder()
				.setCustomId('channel_select')
				.setPlaceholder('Nothing Selected')
				.addOptions(...channelsArr)
			)

			await message.reply({content: "Select a notes channel.", components: [row]})
         

			

        }
    console.log("no")
})

//always last line
client.login(token)