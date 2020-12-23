const {Message, MessageEmbed}= require('discord.js')

module.exports = {
    name : 'mute',
    usage: '@<member>',
    description: 'mute somoene.',
    timeout: 5000,
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
            let member = message.mentions.members.first();
        let reason = args.slice(1).join(' ');

        let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === "muted");

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You don't have permission.")
        if(!message.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) {
            message.channel.send("I don't have permission.")
            return;
        }

        if(!message.channel.permissionsFor(message.author).has("MANAGE_ROLES")) {
            message.channel.send("You don't have permission.")
            return;
        }

        if(!message.channel.permissionsFor(client.user).has("MANAGE_ROLES")) {
            message.channel.send("You don't have permission.")
            return;
        }

        if(!member) {
            message.channel.send("Please specify a member to mute.")
            return;
        }

        if(member.id === message.author.id) {
            message.channel.send("You can't mute yourself.")
            return;
        }

        if(!role) {

            try {

                message.channel.send(`Muted role was not found, attempting to create muted role.`)

                let muterole = await message.guild.roles.create({

                    data: {
                        name: 'muted',
                        permissions: []
                    }

                });

                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {

                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })

                });

                message.channel.send(`Muted role has been successfully created.`)

            } catch(err) {

                console.error(err)

            }

        }

        let muted = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');
        
        if(member.roles.cache.has(muted.id)) return message.channel.send(`**${member.user.username}** is already muted.`)
        await member.roles.add(muted);

        let avatar = member.user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 });

        member.user.send(`You've been **muted** in **${message.guild.name}**\n **Reason:** ${reason || "No reason."}`);

        let muteEmbed = new MessageEmbed()
        .setColor("#363940")
        .setAuthor(`${member.user.username}#${member.user.discriminator} has been muted`, avatar)
        .setDescription(`**Reason**: ${reason || "No reason."}`)

        message.channel.send(muteEmbed)

          
          }
}