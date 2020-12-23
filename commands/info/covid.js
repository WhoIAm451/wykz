const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "corona",
    description: "Returns the statistics of covid-19",
    usage: "corona <country>",
    timeout: 3000,
    run: async (client, message, args) => {
        try {

        if(!args[0]) {
            
            const url = 'https://corona.lmao.ninja/v2/all';
            const res = await fetch(url).then(url => url.json());

            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(`Lumi ™`, client.user.avatarURL())
            .setTitle("Worldwide")
            .addField("Total Cases:", res.cases, true)
            .addField("Total Deaths:", res.deaths, true)
            .addField("Total recoveries:", res.recovered, true)
            .addField("Todays Cases:", res.todayCases, true)
            .addField("Todays Deaths:", res.todayDeaths, true)
            .addField("Active:", res.active, true)

            message.channel.send(embed)

        } else {

            let usage = new MessageEmbed()
                .setColor(process.env.embedcolor)

            const country = args.join(' ');
            const url = `https://corona.lmao.ninja/v2/countries/${country}`;
            const res = await fetch(url).then(url => url.json());

            if(res.message) {
                usage.addField("Invalid Country Name", "Usage: corona [country]")
                message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000})})
                return;
            }

            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("Powered By Xeno", client.user.avatarURL())
            .setThumbnail(res.countryInfo.flag)
            .setTitle(res.country)
            .addField("Total Cases:", res.cases, true)
            .addField("Total Deaths:", res.deaths, true)
            .addField("Total recoveries:", res.recovered, true)
            .addField("Todays Cases:", res.todayCases, true)
            .addField("Todays Deaths:", res.todayDeaths, true)
            .addField("Active:", res.active, true)

            message.channel.send(embed)

        }
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }
    }
}