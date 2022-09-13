require('dotenv').config()
import { Client, GatewayIntentBits, Message, Collection, Guild,GuildBasedChannel} from  'discord.js'
import { getAllChannels } from '../commands/helpers/channel'
import { CommandHandler } from '../handlers/CommandHandler'
const exampleEmbed = {
	color: 0x0099ff,
	title: 'Channels',
	description: 'All Channels',
	fields: [
		{
			name: 'Regular field title',
			value: 'Some value here',
		},
		{
			name: '\u200b',
			value: '\u200b',
			inline: false,
		},
		{
			name: 'Inline field title',
			value: 'Some value here',
			inline: true,
		},
		{
			name: 'Inline field title',
			value: 'Some value here',
			inline: true,
		},
		{
			name: 'Inline field title',
			value: 'Some value here',
			inline: true,
		},
	],
	image: {
		url: 'https://i.imgur.com/AfFp7pu.png',
	},
	timestamp: new Date().toISOString(),
	footer: {
		text: 'Some footer text here',
		icon_url: 'https://i.imgur.com/AfFp7pu.png',
	},
};


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

const getChannelNames = (textChannels: Collection<string, GuildBasedChannel>) =>{

    let counter = 1
    return   textChannels.map((channel, key) =>  {   
        // return `\n [${counter++}]${channel.name} \n`
        exampleEmbed.fields.push({ name:`${counter}`, value: channel.name, inline: true})
    })
}

export const client = new Client({ intents: clientIntents })




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
            await getChannelNames(textChannels)
            // message.channel.send(`> Channels ${await getChannelNames(textChannels)}`)
            message.channel.send({ embeds: [exampleEmbed] });

            // message.channel.send(`> Channels ${await getChannelNames(textChannels)}`)
        }
    console.log("no")
})

//always last line
client.login(token)