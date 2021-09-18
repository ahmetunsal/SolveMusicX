module.exports = {
        name: 'skip',
        run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("BU KOMUTU KULLANMADAN ÖNCE SES KANALINA KATILSAN NASIL OLUR!?");
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("BENİ KULLANMAK İSTİYORSANIZ SES KANALIMA KATILIN!");
          }
        const serverQueue = client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send("❌ **Bu sunucuda hiçbir şey oynatılmıyor**");
      try {
        serverQueue.connection.dispatcher.end();
        return message.channel.send({
          embed:{
          color: "BLUE",
          description:"⏩ Geçildi"
          }})
      } catch {
          serverQueue.connection.dispatcher.end();
          await channel.leave();
          return message.channel.send("TEKRAR DENE LAĞN!")
      }
    }
};
