import { Client, Guild, Message, MessageActivity, MessageComponentType } from "discord.js"


export type ChannelCommandsArgs = {
    client?: Client, 
    channelName?: string, 
    guild?: Guild,
    channelId?: string,
    parentId?: string
}



export type CategoryArgs = {
    categoryName: string,
    client?: Client,
    guild: Guild
}

export type GetThreadsArgs ={
    parentId: string, 
    guild: Guild,
    client?: Client
}

export type NewNotesArgs ={
    client: Client, 
    message: Message, 
    channelName: string, 
    categoryName: string
}