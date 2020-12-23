const {Collection, Client, Discord, MessageEmbed} = require('discord.js')
const fs = require('fs')
const db = require('quick.db')
const DB = require('./models/command')
const ms = require('ms')
const client = new Client({
    disableEveryone: true,
    partials : ["MESSAGE", "CHANNEL", "REACTION"]
});
const config = require('./config.json')
const prefix = config.prefix
const token = config.token
const mongoose = require('mongoose')
const { GiveawaysManager } = require('discord-giveaways')
const { Player } = require('discord-player');
const Schema = require('./models/custom-commands');

mongoose.connect(process.env.mongo, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(console.log('Connected to mongodb'))

client.giveaways = new GiveawaysManager(client, {
    storage : '.giveaways.json',
    updateCountdownEvery: 5000,
    embedColor: '#ff0000',
    reaction : '🎉'
})
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

const player = new Player(client);
client.player = player;

fs.readdir('./player-events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./player-events/${file}`);
        let eventName = file.split(".")[0];
        client.player.on(eventName, event.bind(null, client));
    });
});

const prefixSchema = require('./models/prefix')
    
const Timeout = new Collection();

client.prefix = async function(message) {
        let custom;

        const data = await prefixSchema.findOne({ Guild : message.guild.id })
            .catch(err => console.log(err))
        
        if(data) {
            custom = data.Prefix;
        } else {
            custom = prefix;
        }
        return custom;
    }

client.on('guildDelete', async (guild) => {
    prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            prefixSchema.findOneAndDelete({ Guild : guild.id }).then(console.log('deleted data.'))
        }
    })
})
client.on('ready', async () => {
    setInterval(async () => {
        client.user.setActivity(`${client.users.cache.size} users | ${prefix}help`, { type: "WATCHING" })
    }, 60000);
    console.log(`${client.user.username} ✅`)
})
const blacklist = require('./models/blacklist')
const { schema } = require('./models/command')


// replace the files accordingly
client.on('message', async message =>{
    if(message.author.bot) return;

    if(db.has(`afk-${message.author.id}+${message.guild.id}`)) {
        const info = db.get(`afk-${message.author.id}+${message.guild.id}`)
        await db.delete(`afk-${message.author.id}+${message.guild.id}`)
        message.reply(`Your afk status have been removed (${info})`)
    }
    //checking for mentions
    if(message.mentions.members.first()) {
        if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
            message.channel.send(message.mentions.members.first().user.tag + ":" + db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`))
        }else;
    }else;

    const p = await client.prefix(message)
    if(message.mentions.users.first()) {
        if(message.mentions.users.first().id === '788877393766514688') return message.channel.send(`My prefix is **${p}**.\nYou can change it with the prefix command.`)
    }
    if (!message.content.startsWith(p)) return;
    if (!message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(p.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    const data = await Schema.findOne({ Guild: message.guild.id, Command: cmd });
    if(data) message.channel.send(data.Response);
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        const check = await DB.findOne({ Cmds: command.name})
        if(check) {
            if(check.Cmds.includes(command.name)) return message.channel.send('This command has been disabled by Owner.')
            command.run(client,message,args)
        } else {
        if(command.timeout) {
            if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)
            command.run(client, message, args)
            Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
            setTimeout(() => {
                Timeout.delete(`${command.name}${message.author.id}`)
            }, command.timeout)
        }
        }
    }
})
/*client.on('guildMemberAdd', async(member) => { // this event gets triggered when a new member joins the server!
    // Firstly we need to define a channel
    // either using .get or .find, in this case im going to use .get()
    const Channel = member.guild.channels.cache.get('789113350159859712') //insert channel id that you want to send to
    //making embed
    const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('New Member.')
        .setDescription(`**${member.displayName}** welcome to ${member.guild.name}, we now have ${member.guild.memberCount} members!`)
    // sends a message to the channel
    Channel.send(embed)
})
client.on('guildMemberRemove', async(member) => { // this event gets triggered when a new member leaves the server!
    // Firstly we need to define a channel
    // either using .get or .find, in this case im going to use .get()
    const Channel = member.guild.channels.cache.get('789113350159859712') //insert channel id that you want to send to
    //making embed
    const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle('A member left the server.')
        .setDescription(`**${member.displayName}** has left ${member.guild.name}, we now have ${member.guild.memberCount} members!`)
    // sends a message to the channel
    Channel.send(embed)
})*/
client.login(process.env.token)
