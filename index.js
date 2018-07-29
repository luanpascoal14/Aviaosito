const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const commands = require('./commands.json');

bot.on('message', message => {
    if(message.channel.type === 'dm') return message.reply('Você só pode utilizar comandos em servidores!');
    if(message.author.bot) return;

    responseObject = commands
    if(responseObject[message.content]){
        message.channel.send(responseObject[message.content]);
    }

    const msgs = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = msgs.shift().toLowerCase();


    if(comando === 'serverinfo'){
        
        let server = message.guild.name;
        var ServerInfoEmbed = new Discord.RichEmbed()
        .setColor('#00ff15')
        .setDescription('**Servidor**: **' + server + '**')
        .addField('**Server ID**' + message.guild.id)
        .addField('**Dono**: ' + message.guild.owner)
        .addField('**Região**: ' + message.guild.region)
        .addField('**Criado em**: ' + message.guild.createdAt)
        .addField('**Canais(' + message.guild.channels.size + ")**")
        .addField('**Tags(' + message.guild.roles.size + ')**')
        .addField('**Emojis(' + message.guild.emojis.size + ')**')
        .addField('**Membros(' + message.guild.memberCount + ')**');
        
        message.reply(ServerInfoEmbed);
    }
    if(comando === 'ping'){
        var pingembed = new Discord.RichEmbed()
        .setDescription(`:ping_pong: **PONG!**`)
        .setColor('0x64fc00')
        .addField(`Seu ping é de aproximadamente **${Math.round(bot.ping)}ms**!`)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTimestamp()
    message.delete()
    message.channel.send(pingembed)
    }
    
    if(comando === 'avatar'){
        var AvatarUser = message.mentions.users.first() || message.author;
        var AvatarEmbed = new Discord.RichEmbed()
        .setTitle("Avatar de " + AvatarUser.username)
        .setImage(AvatarUser.displayAvatarURL)
        .setColor(0xFF0000)
        message.channel.send(AvatarEmbed);
           
    }
    if(comando === 'reportar'){
        if (message.mentions.users.size  == 0) return message.reply('Mencione alguem')
        if (!msgs.slice(1).join(' ')) return message.reply('Diga o motivo da denuncia! use a!reportar (usuario) (motivo)')
        var canal = message.guild.channels.find("name", "reports");
        if (!canal) return;
        let ReportarEmbed = new Discord.RichEmbed()
        .setDescription("**Denuncia**")
        .setColor(message.member.displayColor)
        .addField("Nome: " + message.mentions.users.first().username)
        .addField("Motivo: " + msgs.slice(1).join(' '))
        .addField("Horario: " + message.createdAt)
        .addField("Por: " + message.author.username);
        
        message.delete();
        canal.send(ReportarEmbed);
        message.author.send('Sua denuncia foi enviada com sucesso!');
    }
    if(comando === 'report'){
        if (message.mentions.users.size  == 0) return message.reply('Mencione alguem')
        if (!msgs.slice(1).join(' ')) return message.reply('Diga o motivo da denuncia! use a!report (usuario) (motivo)')
        var canal = message.guild.channels.find("name", "reports");
        if (!canal) return;
        let ReportarEmbed = new Discord.RichEmbed()
        .setDescription("**Denuncia**")
        .setColor(message.member.displayColor)
        .addField("Nome: " + message.mentions.users.first().username)
        .addField("Motivo: " + msgs.slice(1).join(' '))
        .addField("Horario: " + message.createdAt)
        .addField("Por: " + message.author.username);
        
        message.delete();
        canal.send(ReportarEmbed);
        message.author.send('Sua denuncia foi enviada com sucesso!');
    }

    if(comando === 'ajuda'){
        let AjudaEmbed = new Discord.RichEmbed()
        .setDescription("**AJUDA DO AVIÃOSITO!**")
        .setColor("#00effc")
        .addField("Comandos: ")
        .addField("**" + config.prefix + "avatar**:", 'Um comando para ver os avatares dos outros membros do servidor!')
        .addField("**" + config.prefix + "ping**:", 'Quer ver o seu ping? Então use esse comando ;-) !')
        .addField("**" + config.prefix + "report**:", 'Use esse comando para reportar mal comportamento de um membro para a staff!')
        .addField("**" + config.prefix + "reportar**:", 'Use esse comando para reportar mal comportamento de um membro para a staff!');
    
        
        message.author.send(AjudaEmbed);
        message.reply('Enviei a ajuda em seu DM!');
        
    }
    if(comando === 'limpar'){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Você não utilizar isso! Apenas com permissão de gerenciar mensgens!");
        if(!msgs[0]) return message.reply('Você precisa informar o numero de mensagens!');
        message.channel.bulkDelete(msgs[0].then(() => {
            message.channel.send('Foram limpadas ' + msgs[0] + ' mensagens!').then(msg => msg.delete(5000));
        }));
    }
    if(comando === 'falar'){
        let saybotmessage = msgs.join(" ");
        message.delete().catch();
        message.channel.send(saybotmessage);
    }
});

bot.on('ready', () => {
    console.log('[Aviãosito] Iniciado !');
    bot.user.setActivity('av!ajuda', {type:'LISTENING'});
});
bot.login(process.env.BOT_TOKEN);
