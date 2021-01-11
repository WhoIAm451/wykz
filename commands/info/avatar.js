const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  usage: '<mention>',
  description: 'i will send your avatar or the avatar of the member.',
  timeout: 1000,
  run: async (client, message, args) => {
        try{
          if (!message.channel.permissionsFor(message.guild.me).has("ATTACH_FILES")) return message.channel.send(`I don't have permissions to attach files to my messages.`);
  
          let user = message.mentions.users.first();
  
          if (!user) {
              const input = message.content.split(` `, 2);
              let userID = input[1];
              user = client.users.cache.get(userID);
          };
  
          if (!user) {
              user = message.author;
          };
  
          let totalMessage = `${user.tag}'s avatar.`;
  
          let avatar = null;
          if (user.avatarURL()) avatar = user.avatarURL({ format: "png", dynamic: true, size: 4096 });
          if (!avatar) return message.channel.send(`${user.tag} doesn't have an avatar, ${message.author}.`);
  
          return message.channel.send(totalMessage, {
              files: [avatar]
          });
  
    //message.channel.send(user.displayAvatarURL( {format: 'png', dynamic: true, size: 4096} ))
  } catch(err) {
    console.error(err)
    return message.channel.send(error)
}
    }
}
