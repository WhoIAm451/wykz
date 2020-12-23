const { DiscordAPIError } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name : 'kick',
    usage: '@<member>',
    description: 'kick the specified member.',
    timeout: 5000,
    run: async(client,message,args) => {
        try {
            //const member = message.mentions.users.first();
            const member = await message.guild.members.fetch(message.mentions.users.first() || args[0]).catch(console.error);

            if(!message.channel.permissionsFor(message.author).has("KICK_MEMBERS")) return message.channel.send("You don't have permission.");
            if(!message.channel.permissionsFor(client.user).has("KICK_MEMBERS")) return message.channel.send('I do not have permission.');
            if(!member) return message.channel.send('Please specify a member to kick.');
            if(!member.kickable) return message.reply("This member is not kickable for me.");
            await member.kick({ reason : args.slice(1).join(" ")})
            message.channel.send(`${member.user.tag} kicked ! :white_check_mark:`)
        } catch(err) {
            console.error(err)
            return message.channel.send("An error occurred while processing the command.")
        }
    }
}