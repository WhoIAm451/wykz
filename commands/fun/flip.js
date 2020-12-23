const { Message, MessageEmbed } = require('discord.js');
const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>?@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~';
const OFFSET = '!'.charCodeAt(0);

module.exports = {
    name: "flip",
    description: "Flips your text upside down",
    usage: "flip <text>",
    timeout: 3000,
    run: async (client, message, args) => {

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)
    
    if(!args[0]) {
        message.channel.send("Please enter a text to flip.")
    }

    message.channel.send(
        args.join(' ').split('')
            .map(c => c.charCodeAt(0) - OFFSET)
            .map(c => mapping[c] || ' ')
            .reverse().join('')
    );  

    }
} 