const Discord = require("discord.js");
const { stripIndent } = require('common-tags');

module.exports = {
    name: "serverinfo",
    aliases: ["si"],
    description: "Shows server stats",
    timeout: 3000,
    run: async (client, message, arg) => {
        try{
        const filterLevels = {DISABLED: 'Off',MEMBERS_WITHOUT_ROLES: 'No Role',ALL_MEMBERS: 'Everyone',0: 'Off',1: 'No Role',2: 'Everyone'};
        const verificationLevels = {NONE: 'None', LOW: 'Low', MEDIUM: 'Medium', HIGH: 'High',VERY_HIGH: 'Highest',0: 'None',  1: 'Low', 2: 'Medium',3: 'High',4: 'Highest'};

        const channels = stripIndent`
            Text  :: ${message.guild.channels.cache.filter(chan => chan.type === 'text').size}
            Voice :: ${message.guild.channels.cache.filter(chan => chan.type === 'voice').size}
        `;

        const boost = stripIndent`
            Count :: ${message.guild.premiumSubscriptionCount || 0}
            Tier  :: ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}
        `;

        const members = stripIndent`
            Online :: ${message.guild.members.cache.filter(member => member.presence.status !== "offline").size}
            Total  :: ${message.guild.memberCount}
        `;

        const other = stripIndent`
            Owner              :: ${message.guild.owner.user.tag}
            Created at         :: ${message.guild.createdAt.toLocaleString()}
            Region             :: ${message.guild.region}
            Verification Level :: ${verificationLevels[message.guild.verificationLevel]}
            Explicit Filter    :: ${filterLevels[message.guild.explicitContentFilter]}
        `;

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setColor('RANDOM')
            .setThumbnail(message.guild.iconURL())
            .addField(`Members`, `\`\`\`asciidoc\n${members}\`\`\``,true)
            .addField(`Channels`, `\`\`\`asciidoc\n${channels}\`\`\``,true)
            .addField(`Boost`, `\`\`\`asciidoc\n${boost}\`\`\``,true)
            .addField(`Other`, `\`\`\`asciidoc\n${other}\`\`\``,false)
            .setTimestamp()
            .setFooter(`Lumi ™`, client.user.avatarURL())
            message.channel.send(embed)
        } catch(err) {
            console.error(err)
            return message.channel.send("An error occurred while processing the command.")
        }
    }
}