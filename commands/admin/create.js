const schema = require('../../models/custom-commands');

module.exports = {
    name: 'cc-create',
    aliases : ['ccc'],
    usage: '<command name> <response>',
    description: 'allows you to create a custom command.',
    timeout: 5000,
    run: async(client, message, args) => {
        try {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permissions.');

        const name = args[0]; const response = args.slice(1).join(" ");

        if(!name) return message.channel.send('Please specify a command name.');
        if(!response) return message.channel.send('Please specify a response.');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(data) return message.channel.send('This custom commands exists already!');
        const newData =  new schema({
            Guild: message.guild.id,
            Command: name,
            Response: response
        })
        await newData.save();
        message.channel.send(`Saved **${name}** as a custom command!`);
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }
    }
}