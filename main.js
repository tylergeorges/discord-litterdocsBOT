require('dotenv').config()
const { Client, GatewayIntentBits} = require('discord.js')
const { CommandHandler } = require('./Handlers/CommandHandler')

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

const client = new Client({ intents: clientIntents })



//when client is ready run this once
client.on('ready', (ready) =>{
    console.log('Notes Manager up and running!')
  
})



client.on("messageCreate", async message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command){
        CommandHandler(client, message,command);
    }
    
})

// bot.on

//always last line
client.login(token)