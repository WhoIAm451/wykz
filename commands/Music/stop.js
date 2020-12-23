module.exports = {
    name : 'stop',
    aliases : ['leave'],
    description: 'Stop the bot.',
    timeout: 5000,
    run : async(client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel !`);

    if (!client.player.getQueue(message)) return message.channel.send(`No music currently playing !`);

    client.player.setRepeatMode(message, false);
    client.player.stop(message);

    message.channel.send(`Music **stopped** into this server !`);
    }
};
