const { MessageEmbed } = require("discord.js");
const beautify = require("beautify");
const owner = require('../../config.json').owner

module.exports = {
    name: "eval",
    description: "Executes some code for you",
    usage: "eval <code to eval>",
    timeout: 1000,
    run: async (client, message, args) => {

        let isBotOwner = message.author.id == owner;

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!isBotOwner) {
            message.channel.send("This is an owner only command.")
        }

        if(!args.join(' ')) {
            message.channel.send("Please enter some code to evaluate")
        }
    

        try {
            if (args.join(" ").toLowerCase().includes("token")) {
                return;
            }   

            let toEval = args.join(" ");
            let evaluated = eval(toEval);

            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(`Lumi ™`, client.user.avatarURL())
            .setTitle("Eval")
            .addField("To evaluate:", `\`\`\`js\n${beautify(args.join(" "), { format: "js" })}\`\`\``)
            .addField("Evaluated:", evaluated)
            .addField("Type of:", typeof(evaluated));

            message.channel.send(embed)

        } catch (e) {

            let embed = new MessageEmbed()
            .setColor("#c0392b")
            .setTimestamp()
            .setFooter(`Lumi ™`, client.user.avatarURL())
            .setTitle("Error")
            .setDescription(e)


            message.channel.send(embed)
        }

    }
}