const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const Canvas = require('canvas');
const express = require('express');
const app = express();

// Create an instance of a Discord client
const client = new Discord.Client();
const PREFIX = '|';
var version ='Beta5';
var animal;
var servers = {};
var peoples = [];
var charism = ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Lion_d%27Afrique.jpg/290px-Lion_d%27Afrique.jpg', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.a5aiwFV1F2Ja-7d3GfDXAAHaF2%26pid%3DApi&f=1',
    'https://images.radio-canada.ca/v1/ici-premiere/16x9/hdm-panda-chine.jpg', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F0b%2F54%2Fd3%2F0b54d326b079394c049557f8dc631224.jpg&f=1&nofb=1',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP._kBmN6cbRFi2-njGYhM1lQHaE3%26pid%3DApi&f=1', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.mUibgH7zai54OhVoxBwJIwHaE6%26pid%3DApi&f=1']

client.on('ready', () => {
    console.log('#############\nBastiBotBeta5\n#############');
});



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setPresence({
        status: 'online',
        activity: {
            name: "prefix : |",
            type: "WATCHING"

        }
    });
});

client.on('message', async message => {
    var content = message.content;

    // if (message.content.includes('sale merde'))
    //     message.channel.send('c toi la merde connard');
    // if (message.content.includes('ta mere la pute'))
    //     message.channel.send('sale fdp de ta mere le chauve');
    // if (message.content.includes('fdp'))
    //     message.channel.send('baise ta mere sale chauve');
    // if (message.content.includes('fils de pute'))
    //     message.channel.send('en vrai ta raison');
    if (message.content.includes('ping'))
        message.channel.send('pong');
    if (message.content === 'zumba')
        message.channel.send('cafew');
    if (message.content === 'karaba')
        message.channel.send('la sorcière');
    if (message.content === 'tic')
        message.channel.send('tac');
    if (message.content === 'zumba cafew')
        message.channel.send('cafew carnaval');
    if (message.content === '|avatar')
        message.reply(message.author.displayAvatarURL());
    if (message.content === '|bastos')
    message.reply('send nudes');

    let args = message.content.split(" ");
    console.log(message.content.split(" "))
    switch (args[0]) {
        case  (PREFIX + 'play') || (PREFIX + 'p') :

        async function play(connection, message) {
            var server = servers[message.guild.id];

            server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));

            console.log('queu2 ' + server.queue.join(' '));
            server.queue.shift();

            server.dispatcher.on('finish', function () {
                if (server.queue[0]) {
                    console.log('restart');
                    play(connection, message);
                } else {
                    connection.disconnect();
                }
            });
        }

            if (!args[1]) {
                message.channel.send("Tas pas mit de lien ducon");
            }
            if (!message.member.voice.channel) {
                message.channel.send("Frere t pas dans un channel et c légèrement embêtant");

            }
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);
            console.log('queue ' + server.queue.join(' '));

            if (!message.guild.voice) message.member.voice.channel.join().then(function (connection) {
                play(connection, message);
            })
            break;
        case PREFIX + 'skip':
            var server = servers[message.guild.id];
            console.log('skipped music');
            if (server.dispatcher) server.dispatcher.end();
            break;
        case PREFIX + 'stop':
            var server = servers[message.guild.id];
            if (message.guild.voice.connection) {
                for (var i = server.queue.length - 1; i >= 0; i++) {
                    server.queue.splice(i, i);
                }
                server.dispatcher.end();
                console.log("Queue stoppe");
            }
            if (message.guild.connection)
                message.guild.voice.connection.disconnect();
            break;

        case PREFIX + 'insulte':
            var server = servers[message.guild.id];
            message.channel.send(args[1].toUpperCase() + ' t vraiment un fils de chien');
            break;
        case PREFIX + 'qi':
            if (args.length > 1) {
                args[0] = ' '
                if (args.indexOf('bastos') === -1 && args.indexOf('<@351409953681965067>') === -1)
                    message.channel.send('le qi de' + args.join(' ') + ' est de ' + Math.ceil(Math.random() * 199));
                else if (args.indexOf('moi') > -1)
                    message.channel.send('ton qi est de ' + Math.ceil(Math.random() * 199))
                else
                    message.channel.send('le qi de <@351409953681965067> est de 200');
            } else {
                message.channel.send('faut mettre un truc apres mon reuf ;)\n qi + car[personne]');
            }
            break;
        case PREFIX + 'version':
            const embed = new Discord.MessageEmbed()
                .addField('Version', version);
            message.channel.send(embed);
            break;
        case PREFIX + 'wesh':
            args[0] = ' '
            message.channel.send('<@!' + message.author.id + '> a dit wesh à' + args.join(' '))
            break;
        case PREFIX + 'test':
            console.log(message.member.voice.channel.id)
            break;
        case PREFIX + 'chut':
            args[0] = ' '
            message.channel.send('chut ' + args.join(' '))
            break;
        case PREFIX + 'c':
            const canvas = Canvas.createCanvas(700, 250);
            const ctx = canvas.getContext('2d');
            const atx = canvas.getContext('2d');

            const background = await Canvas.loadImage('./background.jpg')
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#74037b';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            // Select the font size and type from one of the natively available fonts
            ctx.font = '120px sans-serif';
            // Select the style that will be used to fill the text in
            ctx.fillStyle = '#ffffff';
            // Actually fill the text with a solid color
            ctx.fillText("=", canvas.width / 2.5, canvas.height / 1.5);


// Pick up the pen
            ctx.beginPath();
            // Start the arc to form a circle
            ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
            ctx.arc(575, 125, 100, 0, Math.PI * 2, true);

            // Put the pen down
            ctx.closePath();
            // Clip off the region you drew on
            ctx.clip();

            //if (!args[1]) {
                const mention = message.mentions.members.first();
                const avatar = await Canvas.loadImage(mention.user.displayAvatarURL({format: 'png'}))
            //} else {
            //const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({format: 'jpg'}));
            //}
            ctx.drawImage(avatar, 25, 25, 200, 200);
            console.log(message.member.user.username)
            if (message.author.username === 'Baptman' || message.author.username === '420538996679114762') {
                 animal = await Canvas.loadImage(charism[1]);
            } else {
                 animal = await Canvas.loadImage(charism[Math.ceil(Math.random() * charism.length)]);
            }

            atx.drawImage(animal, 475 , 25, 200, 200);


            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'test.png');
            message.channel.send(attachment);

    }
});

client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'bienvenue');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Bienvenue a toi, ${member} ta de la chance le serv est ouvert au moche`);
});


client.login('ODI3NTE4MzIzOTY0NTEwMjA4.YGcMfg.fiIEEoeWp3JgRSdWvTpltLTq50Y');
