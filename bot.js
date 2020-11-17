const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
const bot_info = require('./bot-info.json');
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

client.on('ready', ()=>{
    on_ready_callbck();
});

client.on('message', message => {
    on_message_callback(message);
})

client.login(bot_info.token);
load_command_files();

function load_command_files()
{
    client.commands.clear();
    cooldowns.clear();

    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for(const file of commandFiles)
    {
        const command = require(`./commands/${file}`);

        client.commands.set(command.name, command);
    }

    reload_command = {
        name: 'reload_all',
        description: 'reloads command set',
        roles: ['SuperAdmin', 'Admin'],
        execute(message, args)
        {
            message.channel.send('Reloading command set');
            load_command_files();
        }
    }

    client.commands.set(reload_command.name, reload_command);
}

function on_ready_callbck()
{
    console.log(`Logged in succsesfully as ${client.user.tag}!`)
}

function on_message_callback(message)
{
    if(!message.content.startsWith(bot_info.prefix) || message.author.bot) return;

    const args = message.content.slice(bot_info.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(!client.commands.has(commandName)) return;

    command = client.commands.get(commandName);

    if(!handle_cooldowns(command, message, args))
    {
        return;
    }

    if(!handle_roles(command, message, args))
    {
        return
    }

    try{
        client.commands.get(commandName).execute(message, args);
    } catch(error)
    {
        console.error(error);
        message.reply('There was an error when attempting to execute this command');
    }
}   

function handle_cooldowns(command, message, args)
{
    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if(timestamps.has(message.author.id)){
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if(now < expirationTime) {
            return false;
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(()=>timestamps.delete(message.author.id), cooldownAmount);

    return true;
}

function handle_roles(command, message, args)
{
    if(command.roles)
    {
        var has_role = false;

        for(role of command.roles)
        {
            if(message.member.roles.cache.some(r => r.name === role))
            {
                has_role = true;
                break;
            }
        }

        if(!has_role)
        {
            return false;
        }
    }

    return true;
}
