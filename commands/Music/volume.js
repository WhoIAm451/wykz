module.exports = {
    name : 'volume',
    usage: '<number>',
    description: 'change the volume of the bot.',
    timeout: 5000,
    run : async(client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel !`);

    if (!client.player.getQueue(message)) return message.channel.send(`No music currently playing !`);

    if (!args[0]) return message.channel.send(`Please enter a number !`);

    if (isNaN(args[0]) || 100 < args[0] || args[0] <= 0) return message.channel.send(`Please enter a valid number (between 1 and 100) !`);

    if (message.content.includes('-') || message.content.includes('+') || message.content.includes(',') || message.content.includes('.')) return message.channel.send(`Please enter a valid number !`);

    client.player.setVolume(message, parseInt(args[0]));

    message.channel.send(`Volume set to **${args.join(" ")}%** !`);
    }
};
