const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');

bot.on('guildMemberRemove', member => {
    if(member.guild.id === '437625052775710753') {
        let canalSAI = member.guild.channels.get('452259852547522570');
        canalSAI.send('👈 ' + member.user.username + ' que pena que você saiu :cry:');
    }
});

bot.on('guildMemberAdd', member => {
    if(member.guild.id === '437625052775710753') {
        let canalBV = member.guild.channels.get('437662840980242432');
        canalBV.send('Bem-Vindo, ' + member.user + ' ao grupo ŘΔƤØŞΔĆŘΔ₣Ŧ, chame seus amigos para se divertir!');
        member.send('Obrigado por entrar no **' + member.guild.name + '** ' + member.user.username + '! Chame seus amigos para sé divertir com você! https://discord.gg/26MPNnh');
    }
});



bot.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return message.reply('Eu sou apenas um Bot, então use comandos em servidores');

    const prefix = config.prefix;
    const msgs = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = msgs.shift().toLowerCase();

    if(message.content.startsWith(prefix + 'si')) {
        if(comando === 'si'){
            
            let SIcon = message.guild.iconURL;
            
            let SEmbed = new Discord.RichEmbed()
            .setThumbnail(SIcon)
            .setColor('#72a8ff')
            .setTitle('**' + message.channel.name + '**')
            .setDescription('Informações:', '⠀')
            .addField('Server ID: ' + message.guild.id, 'Dono: ' + message.guild.owner.nickname)
            .addField('Membros: ' + message.guild.memberCount, 'Canais: ' + message.guild.channels.size);
        }
    }

    if(message.content.startsWith(prefix + 'ping')) {
        if(comando === 'ping'){
            var pingembed = new Discord.RichEmbed()
            .setDescription(`:ping_pong: **PONG!**`)
            .setColor('0x64fc00')
            .addField(`Seu ping é de aproximadamente **${Math.round(bot.ping)}ms**!`, ' ⠀')
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setTimestamp()
            message.delete()
            message.channel.send(pingembed)
        }
    }

    if(message.content.startsWith(prefix + 'avatar')) {
        if(comando === 'avatar'){
            var AvatarUser = message.mentions.users.first() || message.author;
            var AvatarEmbed = new Discord.RichEmbed()
            .setTitle("Avatar de " + AvatarUser.username)
            .setImage(AvatarUser.displayAvatarURL)
            .setColor(0xFF0000)
            message.channel.send(AvatarEmbed);
            
        }
    }
    if(message.content.startsWith(prefix + 'reportar')) {
        if(comando === 'reportar'){
            if (message.mentions.users.size  == 0) return message.reply('Mencione alguem')
            if (!msgs.slice(1).join(' ')) return message.reply('Diga o motivo da denuncia! use a!reportar (usuario) (motivo)')
            var canal = message.guild.channels.find("name", "reports");
            if (!canal) return;
            let RrIcon = message.mentions.users.first().displayAvatarURL;
            let ReportarEmbed = new Discord.RichEmbed()
            .setThumbnail(RrIcon)
            .setDescription("**Denuncia**", ' ⠀')
            .setColor(message.member.displayColor)
            .addField("Nome: ", message.mentions.users.first().username)
            .addField("Motivo: ", msgs.slice(1).join(' '))
            .addField("Horario: ", message.createdAt)
            .addField("Por: ", message.author.username);
            
            message.delete();
            canal.send(ReportarEmbed);
            message.author.send('Sua denuncia foi enviada com sucesso!');
        }
    }
    
    if(message.content.startsWith(prefix + 'report')) {
        if(comando === 'report'){
            if (message.mentions.users.size  == 0) return message.reply('Mencione alguem')
            if (!msgs.slice(1).join(' ')) return message.reply('Diga o motivo da denuncia! use a!report (usuario) (motivo)')
            var canal = message.guild.channels.find("name", "reports");
            if (!canal) return;
            let RtIcon = message.mentions.users.first().displayAvatarURL;
            let ReportarEmbed = new Discord.RichEmbed()
            .setThumbnail(RtIcon)
            .setDescription("**Denuncia**", " ⠀")
            .setColor(message.member.displayColor)
            .addField("Nome: ", message.mentions.users.first().username)
            .addField("Motivo: ", msgs.slice(1).join(' '))
            .addField("Horario: ", message.createdAt)
            .addField("Por: ", message.author.username);
            
            message.delete();
            canal.send(ReportarEmbed);
            message.author.send('Sua denuncia foi enviada com sucesso!');
        }
    }

    if(message.content.startsWith (prefix + 'ajuda')){
        let AEmbed = new Discord.RichEmbed()
        .setTitle('**AJUDA**')
        .setThumbnail(message.client.user.displayAvatarURL)
        .setColor(message.member.displayColor)
        .setDescription('**BOT**: ', '**Aviãosito**')
        .addField('Para escolher uma categoria apenas clique no emoji correspondente!', 'Emojis:')
        .addField('\:card_box:   **Utlidades**', '\:cd: **Musica**')
        .addField('\:back: **Voltar**', '=========');
        message.reply('Enviei minha lista, em seu privado :D!');
        message.author.send(AEmbed).then(msg=>{
            msg.react('🗃').then(r=>{
                msg.react('💿')
                msg.react('🔙')
                
            })
            const utilidadesfilter = (reaction, user) => reaction.emoji.name === '🗃' && user.id === message.author.id;
            const musicafilter = (reaction, user) => reaction.emoji.name === '💿' && user.id === message.author.id;
            const voltarfilter = (reaction, user) => reaction.emoji.name === '🔙' && user.id === message.author.id;
            const utilidades = msg.createReactionCollector(utilidadesfilter, { time: 60000 });
            const musica = msg.createReactionCollector(musicafilter, { time: 60000 });
            const voltar = msg.createReactionCollector(voltarfilter, { time: 60000 });
            utilidades.on('collect', r => { 
                let AEmbedUti = new Discord.RichEmbed()
                .setTitle('**AJUDA**')
                .setColor('#ff0000')
                .setThumbnail(message.client.user.displayAvatarURL)
                .setDescription('**Administração**', 'Comandos:')
                .addField(prefix + "avatar", 'Um comando para ver os avatares dos outros membros do servidor!')
                .addField(prefix + 'botinfo', 'Minhas Informações!')
                .addField(prefix + "falar", 'Quer se divertir? e talvez até enganar outras pessoas, pensando que o bot mesmo está falando? Então use')
                .addField(prefix + "nick", 'Mude seu Apelido no servidor!')
                .addField(prefix + "pedido", 'Comando, para você dar ideias para mim :)')
                .addField(prefix + "ping", 'Veja o seu ping!')
                .addField(prefix + "reportar", 'Use esse comando para reportar mal comportamento de um membro para a staff!')
                .addField(prefix + "votar", 'Você quer perguntar as membros se Sim ou Não, esse é o melhor comando!')
                msg.edit(AEmbedUti);
            })
            musica.on('collect', r2 => { 
                let AEmbedMus = new Discord.RichEmbed()
                .setTitle('**AJUDA**')
                .setColor('#ff0000')
                .setThumbnail(message.client.user.displayAvatarURL)
                .setDescription('**Musica**', 'Comandos:')
                .addField(prefix + 'lista', 'Mostrar a lista de comandos!')
                .addField(prefix + 'parar', 'Faça o bot parar de tocar as musicas e limpar a lista!')
                .addField(prefix + 'pular', 'Passe para o proxima musica da lista!')
                .addField(prefix + 'tocar', 'Toque a musica desejada, utilizando apenas o link!')
                .addField(prefix + 'tocando', 'Mostre a musica atual, que está tocando!')
                .addField(prefix + 'volume', 'Altere o Volume da musica!');
                msg.edit(AEmbedMus);
            })
            voltar.on('collect', r3 => {
                msg.edit(AEmbed);
            })
        })
    }

    if(message.content.startsWith(prefix + 'nick')) {
        if(comando === 'nick') {
            if(!msgs[0]) return message.reply('Você precisa dizer o seu novo nickname!');
            let Nnick = msgs.slice(22).join(" ");
            if(message.guild.owner.id === message.author.id) return message.reply('Desculpa, Mais não posso mudar seu nickname!');
            message.delete().catch();
            message.member.setNickname(Nnick);
            message.reply('Agora seu novo nickname neste servidor é: **' + Nnick + '** !');
        }
    } 
    if(message.content.startsWith(prefix + 'pedido')) {
        if(comando === 'pedido'){
            if(!msgs[0]) return message.reply('Você precisa anotar seu pedido!');
            let PMsg = msgs.join(' ');
            let PIcon = message.author.displayAvatarURL;
            let PColor = message.member.displayColor;
            let PEmbed = new Discord.RichEmbed()
            .setThumbnail(PIcon)
            .setColor(PColor)
            .setDescription('**PEDIDO**', 'Por: ' + message.author.username)
            .addField('Horario:', message.createdAt)
            .addField('**Pedido:**', PMsg);
            message.delete();
            let PDono = message.guild.members.find('id', '364241967388950531');
            message.author.send('**Pedido enviado para um de nossos desenvolvedores!**');
            PDono.send(PEmbed);
        }
    }
    if(message.content.startsWith(prefix + 'votar')) {
        if(comando === 'votar'){
            if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply('Você precisa ter a permissão de gerenciar servidor para isso!');
            if(!msgs[0]) return message.reply('Adicione o Conteudo!');
            let VConteudo = msgs.join(' ');
            let AnuncioEmbed0 = new Discord.RichEmbed()
            .setDescription(`**Votação**`)
            .setAuthor(`${message.author.username}`)
            .setColor('#fffa00')
            .addField(`**${VConteudo}**`, '====================')
            .addField(`\:white_check_mark: Sim`, '\:negative_squared_cross_mark: Não');
            message.channel.send(AnuncioEmbed0).then(m => {
                m.react('❎').then(m.react('✅'))
            });
        }
    }
    if(message.content.startsWith(prefix + 'botinfo')){
        if(comando === 'botinfo'){
            let BIcon = message.client.user.displayAvatarURL;
            
            let BEmbed = new Discord.RichEmbed()
            .setThumbnail(BIcon)
            .setColor(message.member.displayColor)
            .setTitle('**INFORMAÇÕES DO BOT**')
            .setDescription('Bot:', message.client.user.username)
            .addField('Criador:', 'luanpascoal14#9606')
            .addField('Servidor:', 'Casa do Aviãosito Bot => https://discord.gg/sJmTHc4')
            .addField('Servidor Segundario:', 'RaposaCraft => https://discord.gg/MvQqxhy')
            .addField('Usuarios: ' + message.client.users.size, 'Grupos: ' + message.client.guilds.size)
            .addField('SubDono: ', '! 🔥RaposinhoGm__r🔥#3372');

            message.author.send(BEmbed);
            message.reply('Enviei minhas informações em seu privado !');
            
        }
    }

    if(message.content.startsWith(prefix + 'falar')) {
        if(comando === 'falar'){
            let saybotmessage = msgs.join(' ');
            if(!msgs[0]) return message.reply('Adicione alguma coisa para eu poder falar! ;)');
            message.delete().catch();
            message.channel.send(saybotmessage);
        }
    }
    
    
});

const ytdl = require('ytdl-core');
const queue = new Map();

bot.on('message', async message => {
    if(message.author.bot) return;
    const prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.split(' ');
    const serverQueue = queue.get(message.guild.id);

    if(message.content.startsWith(prefix + 'tocar')){
        const voiceChannel = message.member.voiceChannel;
        if(!voiceChannel) return message.reply('Você precisa estar em um canal de voz!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions.has('CONNECT')) {
            return message.reply('Eu não pude conectar em seu canal, pois preciso ter algumas permissões!');
        }
        if(!permissions.has('SPEAK')) {
            return message.reply('Eu não posso falar, pois preciso ter algumas permissões!');
        }

        const songInfo = await ytdl.getInfo(args[1]);
        const song = {
            title: songInfo.title,
            url: songInfo.video_url
        };

        if(!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            };
            queue.set(message.guild.id, queueConstruct);

            queueConstruct.songs.push(song);

            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(message.guild, queueConstruct.songs[0]);
            } catch (error) {
                console.error('Tive um erro! ' + error);
                queue.delete(message.guild.id);
                return message.reply('Eu não pude conectar ao canal, pois tive alguns erros!');
            }

        } else {
            serverQueue.songs.push(song);
            return message.reply(`Adicionado para a lista: **${song.title}**`);
        }
        return;
    } else if (message.content.startsWith(prefix + 'pular')) {
        if(!message.member.voiceChannel) return message.reply('Você não está em um canal de voz!');
        if (!serverQueue) return message.reply('Não está tocando nada!');
        serverQueue.connection.dispatcher.end();
        return;



    } else if (message.content.startsWith(prefix + 'parar')){
        if(!message.member.voiceChannel) return message.reply('Você não está em um canal de voz!');
        if (!serverQueue) return message.reply('Não está tocando nada!');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
        return;



    } else if(message.content.startsWith(prefix + 'volume')) {
        if(!serverQueue) return message.reply('Não estou tocando nada!');
        if(!args[1]) return message.reply(`O volume atual é: **${serverQueue.volume}**`);
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
        return message.reply(`O volume atual agora é: **${args[1]}**`);



    } else if (message.content.startsWith(prefix + 'tocando')) {
        if(!serverQueue) return message.reply('Não estou tocando nada!');
        return message.reply(`Estou Tocando: **${serverQueue.songs[0].title}**`);
    
    
    } else if (message.content.startsWith(prefix + 'lista')) {
        if (!serverQueue) return message.reply('Eu não estou tocando nada!');
        return message.reply(`
==**Lista**==
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Tocando**: ${serverQueue.songs[0].title}
        `);
    }
    return;

});

function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if(!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', () => {
            console.log('Musica acabou!');
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error))
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    serverQueue.textChannel.send(`Agora Tocando: **${song.title}**`);

}


bot.on('ready', () => {
    console.log('[Aviãosito] Iniciado !');
    bot.user.setActivity('av!ajuda', {type:'LISTENING'});
});
bot.login(process.env.BOT_TOKEN);
