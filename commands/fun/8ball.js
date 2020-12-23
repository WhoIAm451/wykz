const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "8ball",
    description: "A fortune telling command",
    usage: "8ball <question>",
    timeout: 3000,
    run: async(client, message, args) => {
        try{

        let question = args.join(" ");

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!question) {
            message.channel.send("Please put your question.")
        }

        const answer = [
            'yes',
            'no',
            'maybe',
            'sort of',
            'can\'t tell',
            'ofc not',
            'probably',
            'yes but no',
            'no but yes',
            'yep',
            'nope',
            'i don\'t think so',
            'well yes but actually no',
            'well no but actually yes',
            'omg yes!',
            'nooooo'
        ];

        message.channel.send(answer[Math.floor(Math.random() * answer.length)]);
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }
    }
}