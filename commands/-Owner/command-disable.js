const schema = require('../../models/command')
const owner = require('../../config.json').owner

module.exports = {
    name : 'cmd-disable',
    aliases : ['cmdd', 'cd'],
    usage: '<command>',
    description: 'disable a command.',
    timeout: 1000,
    run: async(client, message, args) => {
        try {
            if(message.author.id !== owner) return message.channel.send('This is an owner only command.')
        const cmd = args[0];
        if(!cmd) return message.channel.send('Please specify a command.')
        if(!!client.commands.get(cmd) === false) return message.channel.send('This command does not exist.');
        schema.findOne({ Cmds: cmd }, async(err, data) => {
            if(err) throw err;
            if(data) {
                if(data.Cmds.includes(cmd)) return message.channel.send('This command has already been disabled.');
                data.Cmds.push(cmd)
            } else {
                data = new schema({
                    Cmds: cmd
                })
            }
            await data.save();
            message.channel.send(`Command ${cmd} has been disabled.`)
        })
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }
    }
}