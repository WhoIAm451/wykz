const img = require('images-scraper')

const google = new img({
    puppeteer : {
        headless : true,
    }
})

module.exports = {
    name : 'image',
    usage: '<research>',
    description: 'post the image of your research.',
    timeout: 10000,
    run : async(client, message, args) => {
        try {
            const query = args.join(" ")
            if(!query) return message.channel.send('Please enter a search query')
            message.channel.startTyping();
            const results = await google.scrape(query, 1)
            message.channel.send(results[0].url);
            message.channel.stopTyping();
        } catch(err) {
            console.error(err)
            return message.channel.send("An error occurred while processing the command.")
        }  
    }
}