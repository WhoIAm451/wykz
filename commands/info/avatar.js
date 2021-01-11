const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefixSchema = require('../../models/prefix')

module.exports = {
  name: "avatar",
  usage: '<mention>',
  description: 'i will send your avatar or the avatar of the member.',
  timeout: 1000,
  run: async (client, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member || message.author;

    if (!member && args.slice().length === 0) {
      member = message.author;
    }
    else if (member) {
      if (member.bot) return message.channel.send(member.displayAvatarURL( {format: 'png', dynamic: true, size: 4096} ));
    }
    else {
        const fetchedMember = await message.guild.members.fetch(args.slice().join(' '));
        if (!fetchedMember) new Error('Utilisateur non trouver!');
        user = fetchedMember;
        user = user.user;
    }
  
    message.channel.send(user.displayAvatarURL( {format: 'png', dynamic: true, size: 4096} ))
    }
}
