const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const commands = require('./commands.json');

bot.on('guildMemberAdd', member => {
    if(member.guild.id === '437625052775710753') {
        let canalBV = member.guild.channels.get('437662840980242432');
        canalBV.send('Bem-Vindo, ' + member.user.username + ' ao grupo ŘΔƤØŞΔĆŘΔ₣Ŧ, chame seus amigos para se divertir!');
        member.send('Obrigado por entrar no **' + member.guild.name + '** ' + member.user.username + '! Chame seus amigos para sé divertir com você! https://discord.gg/26MPNnh');
    }
});

bot.on('guildMemberRemove', member => {
    if(member.guild.id === '437625052775710753') {
        let canalSAI = member.guild.channels.get('452259852547522570');
        canalSAI.send('👈 ' + member.user.username + ' você sempre será Bem Vindo ✔');
    }
    if(member.guild.id === '437625052775710753') {
        let canalBV = member.guild.channels.get('437662840980242432');
        canalBV.send('Bem-Vindo, ' + member.user.username + ' ao grupo ŘΔƤØŞΔĆŘΔ₣Ŧ, chame seus amigos para se divertir!');
        member.send('Obrigado por entrar no **' + member.guild.name + '** ' + member.user.username + '! Chame seus amigos para sé divertir com você! https://discord.gg/26MPNnh');
    }
});



bot.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return message.reply('Eu sou apenas um Bot, então use comandos em servidores');
    

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
        .addField("**" + config.prefix + "falar**:", 'Quer se divertir? e talvez até enganar outras pessoas, pensando que o bot mesmo está falando? Então use')
        .addField("**" + config.prefix + "limpar**:", 'Comando para administrador seu servidor! Limpe mensagens com facilidade!')
        .addField("**" + config.prefix + "ping**:", 'Quer ver o seu ping? Então use esse comando ;-) !')
        .addField("**" + config.prefix + "report**:", 'Use esse comando para reportar mal comportamento de um membro para a staff!')
        .addField("**" + config.prefix + "reportar**:", 'Use esse comando para reportar mal comportamento de um membro para a staff!');
    
        
        message.author.send(AjudaEmbed);
        message.reply('Enviei a ajuda em seu DM!');
        
    }
    if (message.content.startsWith(',expulsar')){
        message.delete()
        let ExpulsarCanal1 = message.guild.channels.find('id', '454386124144508928');
        let ExpulsarCanal2 = message.guild.channels.find('id', '451258534391447552');
        let ExpulsarCargo1 = message.guild.roles.find('id', '472898315034296340');
        var args = message.content.split(' ').slice(1)
        console.log(args)
        var razao = args.slice(1).join(" ")
        var membro = message.mentions.members.first();
        if(!message.member.roles(ExpulsarCanal1)) return message.reply("Vamos com calma que não é bem assim que funciona! Você não tem permissão para usar esse comando! :no_good:")
        if(!membro) return message.member.send ("Eu não saberei quem você quer expulsar se você não mencionar a pessoa! Volte lá e faça o comando novamente! :rolling_eyes:")
        if(!membro.kickable) return message.member.send ("Opaaa! Como assim? Você não pode expulsar o meu criador! :rolling_eyes: :rage:")
        if(razao.length < 1) return message.member.send ("Eu não vou poder dar continuidade no seu pedido se você nem expecificou o motivo! Volte lá e faça o comando novamente! :rolling_eyes:")
        membro.kick()
        ExpulsarCanal1.send('O membro ' + membro.user.username + 'foi expulso(a) do servidor.\nStaff: ' + message.author.username + '\nMotivo: ' + razao);
        ExpulsarCanal2.send('O membro ' + membro.user.username + 'foi expulso(a) do servidor.\nMotivo: ' + razao);
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
    if(comando === 'pedido'){
        let PedidoDescricao
        let PedidoEmbed = new Discord.RichEmbed()
        .setColor('#00ff0c')
        .setDescription('**PEDIDO**')
        .addField('**Servidor**: ' + message.guild.name)
        .addField('**Nome**: ' + message.author.username)
        .addField('Horario: ' + message.createdAt)
        .addField
        .image(message.guild.iconURL)
        
    }
});

bot.on('guildMemberAdd', member => {
    let canalBV = message.guild.channels.find('name', 'bem-vindo')
})

bot.on('ready', () => {
    console.log('[Aviãosito] Iniciado !');
    bot.user.setActivity('av!ajuda', {type:'LISTENING'});
});
bot.login(process.env.BOT_TOKEN);
