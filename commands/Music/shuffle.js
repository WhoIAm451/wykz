module.exports = {
    name : 'shuffle',
    description: 'Show you how many song are in the queue',
    timeout: 3000,
    run : async(client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel !`);

    if (!client.player.getQueue(message)) return message.channel.send(`No music currently playing !`);

    client.player.shuffle(message);

    return message.channel.send(`Queue shuffled **${client.player.getQueue(message).tracks.length}** song(s) !`);
    }
};
