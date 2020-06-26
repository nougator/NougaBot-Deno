import { Coward, Message, Channel } from 'https://deno.land/x/coward/mod.ts';

let token = 'Place your token here';

const client = new Coward(token);

let prefix = '$';

client.on('ready', () => {
    console.log('Ready');
});

client.on('messageCreate', (msg = Message) => {
    let messageArray = msg.content.split(' ');
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    let rawArgs = msg.content.substring(cmd.length+1);
    
    if(msg.author.bot) return;

    switch(cmd) {
        case prefix + 'ping':
            client.postMessage(msg.channel.id, "Pong!");
            break;
        
        case prefix + 'say':
            if(args[0]) {
                client.postMessage(msg.channel.id, rawArgs);
            }
            break;

        case prefix + 'help':
            client.postMessage(msg.channel.id, {
				embed: {
					title: 'J\'ai entendu que vous avez besoin d\'aide!',
                    description: 'Voici les commandes du bot:',
                    fields: [
                        {
                            name: prefix + 'help',
                            value: 'Affiche le menu d\'aide.',
                            inline: true
                        },
                        {
                            name: prefix + '8ball',
                            value: 'Répond (par oui ou par non) a une question.',
                            inline: true
                        },
                        {
                            name: prefix + 'cat',
                            value: 'Montre une photo aléatoire de chat.',
                            inline: true
                        },
                        {
                            name: prefix + 'dog',
                            value: 'Montre une photo aléatoire de chien.',
                            inline: true
                        },
                        {
                            name: prefix + 'joke',
                            value: 'Envoie une blague aléatoire.',
                            inline: true
                        },
                        {
                            name: prefix + 'ping',
                            value: 'Donne la latence du bot.',
                            inline: true
                        },
                        {
                            name: prefix + 'report',
                            value: 'Permet de signaler un utilisateur.',
                            inline: true
                        },
                        {
                            name: prefix + 'choice',
                            value: 'Choisi un mot.',
                            inline: true
                        }
                    ],
                    color: 0x000000
				}
            });
            break;
    }
});

client.connect()