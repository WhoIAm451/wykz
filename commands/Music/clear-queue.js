module.exports = {
    name : 'clear-queue',
    aliases : ['cq'],
    description: 'clear the current queue.',
    timeout: 5000,
    run : async(client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel !`);

    if (!client.player.getQueue(message)) return message.channel.send(`No music currently playing !`);

    client.player.clearQueue(message);

    message.channel.send(`The queue has just been **removed** !`);
    }
};
