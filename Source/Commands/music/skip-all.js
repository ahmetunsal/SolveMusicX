module.exports = {
        name: 'skipall',
        aliases: ['skip-all'],
       run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send('Üzgünüm ama müziği atlamak için bir ses kanalında olmanız gerekiyor!');
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("**Bot İle Aynı Kanalda Olmalısınız!**");
          }
        const serverQueue = client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send("Hiçbir şey çalmıyor.");
        if (!serverQueue.songs) return message.channel.send("Sırada Şarkı Yok!");
      try {
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
        return message.channel.send("Bütün şarkılar atlatıldı**");
      } catch {
          serverQueue.connection.dispatcher.end();
          await channel.leave();
          return message.channel.send("TEKRAR DENE LAĞN!");
      }
    }
};
