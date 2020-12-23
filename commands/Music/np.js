module.exports = {
    name : 'np',
    description: 'Show you all the information about the current song.',
    timeout: 5000,
    run : async(client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel !`);

    if (!client.player.getQueue(message)) return message.channel.send(`No music currently playing !`);

    const track = await client.player.nowPlaying(message);
    const filters = [];

    Object.keys(client.player.getQueue(message).filters).forEach((filterName) => {
        if (client.player.getQueue(message).filters[filterName]) filters.push(filterName);
    });

    message.channel.send({
        embed: {
            color: 'RED',
            author: { name: track.title },
            fields: [
                { name: 'Channel', value: track.author, inline: true },
                { name: 'Requested by', value: track.requestedBy.username, inline: true },
                { name: 'From playlist', value: track.fromPlaylist ? 'Yes' : 'No', inline: true },

                { name: 'Views', value: track.views, inline: true },
                { name: 'Duration', value: track.duration, inline: true },

                { name: 'Progress bar', value: client.player.createProgressBar(message, { timecodes: true }), inline: true }
            ],
            footer: {
                text: 'Lumi ™',
                icon_url: client.user.avatarURL(),
            },
            thumbnail: { url: track.thumbnail },
            timestamp: new Date(),
        },
    });
    }
};
