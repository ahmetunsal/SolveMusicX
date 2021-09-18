module.exports = {
        name: 'stop',
        
    run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel){ message.channel.send("BU KOMUTLARI KULLANMADAN ÖNCE SES KANALINA KATILIN!")}
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("AYNI SES KANALINDA OLUN");
          }
        const serverQueue = client.queue.get(message.guild.id);
      try {
        if (serverQueue) {
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end()
        message.guild.me.voice.channel.leave();
        } else {
        channel.leave();
        }
        return message.channel.send({embed: {
          description:'↪ Çıkıyorum ben Allah\'a emanet'}})
      } catch {
          serverQueue.connection.dispatcher.end();
          await channel.leave();
          return message.channel.send("TEKRAR DENE LAĞN!");
      }
    }
};
