module.exports = {
        name: 'resume',
        
    run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) { message.channel.send("Şey... bu komutu kullanmadan önce ses kanalına katılsan?")
                       }
        const serverQueue = client.queue.get(message.guild.id);
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("Benim bulunduğum ses kanalına katılman gerekiyor.");
        }
      try {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return message.channel.send({embed:{
color: "BLUE",                                       description:'▶ **Devam Ettiriliyor**'}});
        }
        return message.channel.send('**Devam edecek bir şey yok**.');
      } catch {
        serverQueue.connection.dispatcher.end();
        return message.channel.send("**TEKRAR DENE LAĞN!**")
      }
    }
};
