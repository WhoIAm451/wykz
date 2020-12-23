module.exports = {
    name : 'resume',
    description: 'Resume the song if paused.',
    timeout: 5000,
    run : async(client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel !`);

    if (!client.player.getQueue(message)) return message.channel.send(`No music currently playing !`);

    client.player.resume(message);

    message.channel.send(`Song ${client.player.getQueue(message).playing.title} **resumed** !`);
    }
};
