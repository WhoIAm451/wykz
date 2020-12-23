const schema = require('../../models/command')
const owner = require('../../config.json').owner

module.exports = {
    name : 'cmd-enable',
    aliases : ['cmde', 'ce'],
    usage: '<command>',
    description: 'enable a command disabled.',
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
              if(data.Cmds.includes(cmd)) {
                  let commandNumber;

                  for (let i = 0; i < data.Cmds.length; i++) {
                      if(data.Cmds[i] === cmd) data.Cmds.splice(i, 1)
                  }

                  await data.save()
                  message.channel.send(`Enabled ${cmd}!`)
              }  else return message.channel.send('That command isnt turned off.')
          }
        })
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }
    }
}