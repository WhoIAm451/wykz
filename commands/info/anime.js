const { MessageEmbed } = require("discord.js");
const get = require("request-promise-native");

module.exports = {
    name: "anime",
    description: "Returns information about an anime",
    usage: "anime <anime>",
    timeout: 3000,
    run: async (client, message, args) => {
        try {

        let anime = args.join(' ');

        let option = {
            url: `https://kitsu.io/api/edge/anime?filter[text]=${anime}`,
            method: `GET`,
            headers: {
              'Content-Type': "application/vnd.api+json",
              'Accept': "application/vnd.api+json"
      
            },
            json: true
          }

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)
        
        if(!anime) {
            message.channel.send("please specify a anime name.")
        }

        get(option).then(body => {

            try {

                let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter(`Lumi ™`, client.user.avatarURL())
                .setDescription(body.data[0].attributes.synopsis)
                .setThumbnail(body.data[0].attributes.posterImage.original)
                .addField("Ratings:", body.data[0].attributes.averageRating, true)
                .addField("Total episodes:", body.data[0].attributes.episodeCount, true)
                .setImage(body.data[0].attributes.coverImage.original)

            message.channel.send(embed)

            } catch (err) {

                if(err) message.channel.send("I was unable to find this anime")

            }

        })
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }
    }
}