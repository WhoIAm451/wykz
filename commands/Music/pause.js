module.exports = {
    name : 'pause',
    description: 'Pause the current song.',
    timeout: 5000,
    run : async(client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel !`);

    if (!client.player.getQueue(message)) return message.channel.send(`No music currently playing !`);

    client.player.pause(message);

    message.channel.send(`Song ${client.player.getQueue(message).playing.title} **paused** !`);
    }
};
