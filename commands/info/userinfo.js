const { MessageEmbed } = require("discord.js");
//const { stripIndents } = require("common-tags");
const moment = require('moment');

module.exports = {
    name: "userinfo",
    aliases: ["ui", "whois"],
    description: "Returns user info",
    usage: "[name | id | mention]",
    timeout: 3000,
    run: async (client, message, args) => {
        try {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member || message.author;

        if (member.presence.status === 'dnd') member.presence.status = 'Do Not Disturb';
        if (member.presence.status === 'online') member.presence.status = 'Online';
        if (member.presence.status === 'idle') member.presence.status = 'Idle';
        if (member.presence.status === 'offline') member.presence.status = 'Offline';

        let x = Date.now() - member.createdAt;
        let y = Date.now() - message.guild.members.cache.get(member.id).joinedAt;

        const joineddate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss");
        let status = member.presence.status;

        let whoEmbed = new MessageEmbed()
        .setTimestamp()
        .setFooter(`Lumi ™`, client.user.avatarURL())
        .setThumbnail(member.user.displayAvatarURL())
        .setColor("RANDOM")
        .addField("User", member.user.tag, true)
        .addField("User ID", member.user.id, true)
        .addField('\u200b', '\u200b', true)
        .addField("Account Creation", moment.utc(member.user.createdAt).format("MMMM Do YYYY"), true)
        .addField("Joined On", joineddate, true)
        .addField('\u200b', '\u200b', true)
        .addField("Status", status, true)
        .addField("Highest Role", member.roles.highest, true)
        .addField('\u200b', '\u200b', true)

        message.channel.send(whoEmbed);
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }

    }
}