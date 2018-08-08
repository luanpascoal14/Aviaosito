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
    if(message.author.id === '') return message.reply('Desculpe! Aconteceu algum erro no meu sistema, então você não poderá utilizar esse comando!');

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

    if(message.content.startsWith(prefix + 'ajuda')) {
        if(comando === 'ajuda'){
            let AIcon = message.author.displayAvatarURL;
            let AjudaEmbed = new Discord.RichEmbed()
            .setDescription("**AJUDA DO AVIÃOSITO!**")
            .setThumbnail(AIcon)
            .setColor("#00effc")
            .addField("Comandos: ", '->')
            .addField("**" + prefix + "avatar**:", 'Um comando para ver os avatares dos outros membros do servidor!')
            .addField("**" + prefix + "falar**:", 'Quer se divertir? e talvez até enganar outras pessoas, pensando que o bot mesmo está falando? Então use')
            .addField("**" + prefix + "nick**:", 'Mude seu Apelido no servidor!')
            .addField("**" + prefix + "pedido**:", 'Comando, para você dar ideias para mim :)')
            .addField("**" + prefix + "ping**:", 'Quer ver o seu ping? Então use esse comando ;-) !')
            .addField("**" + prefix + "reportar**:", 'Use esse comando para reportar mal comportamento de um membro para a staff!')
            .addField("**" + prefix + "votar**:", 'Você quer perguntar as membros se Sim ou Não, esse é o melhor comando!');
        
            
            message.author.send(AjudaEmbed);
            message.reply('Enviei a ajuda em seu Privado! ;)');
            
        }
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

bot.on('ready', () => {
    console.log('[Aviãosito] Iniciado !');
    bot.user.setActivity('av!ajuda', {type:'LISTENING'});
});
bot.login(process.env.BOT_TOKEN);
