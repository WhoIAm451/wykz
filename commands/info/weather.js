const { Message, MessageEmbed } = require('discord.js');
const indentString = require('indent-string');
const fetch = require("node-fetch");
const moment = require("moment");

module.exports = {
    name: "weather",
    description: "Returns the weather of the specified location",
    usage: "weather <location>",
    timeout: 3000,
    run: async (client, message, args) => {
        try {

        const name = args.join(" ");

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!name) {
            message.channel.send("Please enter the location of which you would like to see the weather")
        }

        const url = `http://api.weatherstack.com/current?access_key=7b6a0f18cbbafd25aaa50f75b1356970&query=${name}`;
        const res = await fetch(url).then(url => url.json());

        let time = moment(res.localtime_epoch);

        let weatherEmbed = new MessageEmbed()
        .setTitle(`${res.location.name}, ${res.location.country}`)
        .setDescription(`
        ${time}
        ${res.current.weather_descriptions}
        `)
        .addField("Information", [
            `**Temperature:** ${res.current.temperature}°C`,
            `**Precipitation:** ${res.current.precip}%`,
            `**Humidity:** ${res.current.humidity}%`,
            `**Wind:** ${res.current.wind_speed}km/h`
        ])
        .setThumbnail(`${res.current.weather_icons}`)
        .setTimestamp()
        .setFooter(`Lumi ™`, client.user.avatarURL())

        message.channel.send(weatherEmbed);
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }
    }
}