const { DiscordAPIError } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name : 'ban',
    usage: '@<member>',
    description: 'ban the specified member.',
    timeout: 5000,
    run : async(client,message,args) => {
        try {
            //const member = message.mentions.users.first();
            const member = await message.guild.members.fetch(message.mentions.users.first() || args[0]).catch(console.error);

            if(!message.channel.permissionsFor(message.author).has("BAN_MEMBERS")) return message.channel.send("You don't have permission.");
            if(!message.channel.permissionsFor(client.user).has("BAN_MEMBERS")) return message.channel.send("I don't have permission.");
            if(!member) return message.channel.send('Please specify a member to ban.');
            if(!member.bannable) return message.reply("This member is not bannable for me.");
            await member.ban({ reason : args.slice(1).join(" ")})
            message.channel.send(`${member.user.tag} banned ! :white_check_mark:`)
        } catch(err) {
            console.error(err)
            return message.channel.send("An error occurred while processing the command.")
        }
    }
}