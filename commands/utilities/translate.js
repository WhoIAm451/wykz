const translate = require('translate-google')
const prefixSchema = require('../../models/prefix')
const { MessageEmbed } = require("discord.js");
const { confirmation } = require('@reconlx/discord.js')
const langs = {
    auto: 'Automatic',
    af: 'Afrikaans',
    sq: 'Albanian',
    ar: 'Arabic',
    hy: 'Armenian',
    az: 'Azerbaijani',
    eu: 'Basque',
    be: 'Belarusian',
    bn: 'Bengali',
    bs: 'Bosnian',
    bg: 'Bulgarian',
    ca: 'Catalan',
    ceb: 'Cebuano',
    ny: 'Chichewa',
    'zh-cn': 'Chinese Simplified',
    'zh-tw': 'Chinese Traditional',
    co: 'Corsican',
    hr: 'Croatian',
    cs: 'Czech',
    da: 'Danish',
    nl: 'Dutch',
    en: 'English',
    eo: 'Esperanto',
    et: 'Estonian',
    tl: 'Filipino',
    fi: 'Finnish',
    fr: 'French',
    fy: 'Frisian',
    gl: 'Galician',
    ka: 'Georgian',
    de: 'German',
    el: 'Greek',
    gu: 'Gujarati',
    ht: 'Haitian Creole',
    ha: 'Hausa',
    haw: 'Hawaiian',
    iw: 'Hebrew',
    hi: 'Hindi',
    hmn: 'Hmong',
    hu: 'Hungarian',
    is: 'Icelandic',
    ig: 'Igbo',
    id: 'Indonesian',
    ga: 'Irish',
    it: 'Italian',
    ja: 'Japanese',
    jw: 'Javanese',
    kn: 'Kannada',
    kk: 'Kazakh',
    km: 'Khmer',
    ko: 'Korean',
    ku: 'Kurdish (Kurmanji)',
    ky: 'Kyrgyz',
    lo: 'Lao',
    la: 'Latin',
    lv: 'Latvian',
    lt: 'Lithuanian',
    lb: 'Luxembourgish',
    mk: 'Macedonian',
    mg: 'Malagasy',
    ms: 'Malay',
    ml: 'Malayalam',
    mt: 'Maltese',
    mi: 'Maori',
    mr: 'Marathi',
    mn: 'Mongolian',
    my: 'Myanmar (Burmese)',
    ne: 'Nepali',
    no: 'Norwegian',
    ps: 'Pashto',
    fa: 'Persian',
    pl: 'Polish',
    pt: 'Portuguese',
    ma: 'Punjabi',
    ro: 'Romanian',
    ru: 'Russian',
    sm: 'Samoan',
    gd: 'Scots Gaelic',
    sr: 'Serbian',
    st: 'Sesotho',
    sn: 'Shona',
    sd: 'Sindhi',
    si: 'Sinhala',
    sk: 'Slovak',
    sl: 'Slovenian',
    so: 'Somali',
    es: 'Spanish',
    su: 'Sudanese',
    sw: 'Swahili',
    sv: 'Swedish',
    tg: 'Tajik',
    ta: 'Tamil',
    te: 'Telugu',
    th: 'Thai',
    tr: 'Turkish',
    uk: 'Ukrainian',
    ur: 'Urdu',
    uz: 'Uzbek',
    vi: 'Vietnamese',
    cy: 'Welsh',
    xh: 'Xhosa',
    yi: 'Yiddish',
    yo: 'Yoruba',
    zu: 'Zulu'
  }
module.exports= {
    name : 'translate',
    usage: `<language> <sentence to translate>\n or translate language (to get all language available)`,
    description: 'translate the sentence of your choice.',
    timeout: 5000,
    run : async(client, message, args) => {
        try{
            const p = await client.prefix(message)

            function getCode(desiredLang) {
                if (!desiredLang) {
                  return false
                }
                desiredLang = desiredLang.toLowerCase()
                if (langs[desiredLang]) {
                  return desiredLang
                }
                var keys = Object.keys(langs).filter(key => {
                  if (typeof langs[key] !== 'string') {
                    return false
                  }
                  return langs[key].toLowerCase() === desiredLang
                })
                return keys[0] || false
            }

        const embed = new MessageEmbed()
        .setTitle("Here are all language:")
        .setTimestamp()
        .setFooter(`Lumi ™`, client.user.avatarURL())
        .setDescription(`Use \`${p}translate\` followed by a language aliases.\nFor example: ${p}translate \`fr\` Hello.`)
        .addFields(
            { name: 'Language', value: "auto: 'Automatic'\n af: 'Afrikaans'\n sq: 'Albanian'\n ar: 'Arabic'\n hy: 'Armenian'\n az: 'Azerbaijani'\n eu: 'Basque'\n be: 'Belarusian'\n bn: 'Bengali'\n bs: 'Bosnian'\n bg: 'Bulgarian'\n ca: 'Catalan'\n ceb: 'Cebuano'\n ny: 'Chichewa'\n 'zh-cn': 'Chinese Simplified'\n 'zh-tw': 'Chinese Traditional'\n co: 'Corsican'\n hr: 'Croatian'\n cs: 'Czech'\n da: 'Danish'\n nl: 'Dutch'\n en: 'English'\n eo: 'Esperanto'\n et: 'Estonian'\n tl: 'Filipino'\n fi: 'Finnish'\n fr: 'French'\n fy: 'Frisian'\n gl: 'Galician'\n ka: 'Georgian'\n de: 'German'\n el: 'Greek'\n gu: 'Gujarati'\n ht: 'Haitian Creole'\n ha: 'Hausa'\n haw: 'Hawaiian'\n iw: 'Hebrew'\n hi: 'Hindi'" }
        )
        .setColor(Math.floor(Math.random() * 16777214) + 1);

        const embed1 = new MessageEmbed()
        .setTitle("Here are all language:")
        .setDescription(`Use \`${p}translate\` followed by a language aliases.\nFor example: ${p}translate \`fr\` Hello.`)
        .addFields(
            { name: 'Language', value: "hmn: 'Hmong'\n hu: 'Hungarian'\n is: 'Icelandic'\n ig: 'Igbo'\n id: 'Indonesian'\n ga: 'Irish'\n it: 'Italian'\n ja: 'Japanese'\n jw: 'Javanese'\n kn: 'Kannada'\n kk: 'Kazakh'\n km: 'Khmer'\n ko: 'Korean'\n ku: 'Kurdish (Kurmanji)'\n ky: 'Kyrgyz'\n lo: 'Lao'\n la: 'Latin'\n lv: 'Latvian'\n lt: 'Lithuanian'\n lb: 'Luxembourgish'\n mk: 'Macedonian'\n mg: 'Malagasy'\n ms: 'Malay'\n ml: 'Malayalam'\n mt: 'Maltese'\n mi: 'Maori'\n mr: 'Marathi'\n mn: 'Mongolian'\n my: 'Myanmar (Burmese)'\n ne: 'Nepali'\n no: 'Norwegian'\n ps: 'Pashto'\n fa: 'Persian'\n pl: 'Polish'\n pt: 'Portuguese'\n ma: 'Punjabi'\n ro: 'Romanian'\n ru: 'Russian'\n sm: 'Samoan'\n gd: 'Scots Gaelic'\n sr: 'Serbian'\n st: 'Sesotho'\n sn: 'Shona'\n sd: 'Sindhi'\n si: 'Sinhala'\n sk: 'Slovak'\n sl: 'Slovenian'\n so: 'Somali'\n es: 'Spanish'\n su: 'Sudanese'\n sw: 'Swahili'\n sv: 'Swedish'\n tg: 'Tajik'\n ta: 'Tamil'\n te: 'Telugu'\n th: 'Thai'\n tr: 'Turkish'\n uk: 'Ukrainian'\n ur: 'Urdu'\n uz: 'Uzbek'\n vi: 'Vietnamese'\n cy: 'Welsh'\n xh: 'Xhosa'\n yi: 'Yiddish'\n yo: 'Yoruba'\n zu: 'Zulu'" }
        )
        .setTimestamp()
        .setFooter(`Lumi ™`, client.user.avatarURL())
        .setColor(Math.floor(Math.random() * 16777214) + 1);

                async function f() {
                    message.channel.bulkDelete(1);
                    const emote = await message.channel.send(embed)
                    await emote.react("▶️")

                    const collector = emote.createReactionCollector((reaction, user) => user.id === message.author.id);

                    collector.on('collect', async(reaction) => {
                        if (reaction.emoji.name === "▶️") {
                            emote.reactions.removeAll(message.author.id);
                            emote.edit(embed1).then(msg => {
                                msg.delete({timeout: 10000})
                            }).catch(console.error)
                            await emote.react("◀️")
                        }
                        if (reaction.emoji.name === "◀️") {
                            emote.reactions.removeAll(message.author.id);
                            emote.edit(embed).then(msg => {
                                msg.delete({timeout: 10000})
                            }).catch(console.error)
                            await emote.react("▶️")
                        }
                    })
                }
                if (args[0] === "language") {
                    return f()
            }
            if (!args[0]) {
                message.channel.bulkDelete(1);
                message.channel.send(`Specify a language to translate.`).then(msg => {
                    msg.delete({timeout: 10000})
                }).catch(console.error)
    
            } else {
    
                if (!args[1]) {
                    message.channel.bulkDelete(1);
                    message.channel.send("Specify a sentence to translate.").then(msg => {
                        msg.delete({timeout: 10000})
                    }).catch(console.error)
    
                } else {
                    let transArg = args[0].toLowerCase();
    
                    args = args.join(' ').slice(1)
    
                    toto = getCode(transArg)
    
        
                    //if (!langs.includes(transArg)) return message.channel.send(":x: | **Langage indisponible**. Langage disponible : ").then(message.channel.send(langs.join(", "), {code:'ascii'}));
                    args = args.slice(transArg.length);
    
    
                    translate(args, {to: toto}).then(res => {
                        message.channel.send(res)
    
                    }).catch(err => {
                        console.error(err)
                    });
    
                }
    
            }

        } catch(err) {
            console.error(err)
            return message.channel.send("An error occurred while processing the command.")

        }
    }
}