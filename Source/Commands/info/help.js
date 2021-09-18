const discord = require("discord.js");

module.exports = {
  name: "help",
  aliases : ["yardım"],
  run: async (client, message, args) => {


    const embed2 = `
    
    Yardım menusüne hoşgeldin.

    s!help | s!yardım : Bu sayfayı gösterir.
    s!ping : İşe yaramaz. Boşver.
    s!loop | s!döngü : Mevcut şarkıyı sürekli tekrarlar.
    s!np | s!sc : O an çalan şarkıyı gösterir.
    s!pause | s!durdur : Mevcut şarkıyı durdurur.
    s!play | s!oynat <şarkı ismi> : Yazdığınız şarkıyı oynatır.

    -*Diğerlerini yazmaya üşendim neredeyse hepsi aynı zaten.*-

    `
    const embed = new discord.MessageEmbed()

      .setTitle(`${client.user.username} Yardım Menu`)

      .setThumbnail(
        message.author.displayAvatarURL({ dynamic: true, size: 1024 })
      )

      .setDescription(`${embed2}`)
      .setFooter(message.guild);
    message.channel.send(embed);
  }
};
