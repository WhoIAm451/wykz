module.exports = {
    name : 'loop',
    description: 'loop the current music.',
    timeout: 5000,
    run : async(client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel !`);

    if (!client.player.getQueue(message)) return message.channel.send(`No music currently playing !`);

    const repeatMode = client.player.getQueue(message).repeatMode;

    if (repeatMode) {
        client.player.setRepeatMode(message, false);
        return message.channel.send(`Repeat mode **disabled** !`);
    } else {
        client.player.setRepeatMode(message, true);
        return message.channel.send(`Repeat mode **enabled** !`);
    };
    }
};
