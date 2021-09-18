module.exports = {
        name: "remove",
        aliases: ["rs"],
        run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("**Lütfen Bir Şarkı Numarası Girin!**")

        const { channel } = message.member.voice;
        if (!channel) return message.channel.send('Üzgünüm ama belirli bir şarkı numarasını kaldırmak için bir ses kanalında olmanız gerekiyor!');
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("**Bot İle Aynı Kanalda Olmalısınız!**");
        };
        const serverQueue = client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send("Hiçbir şey oynatılmıyor.");
      try {
        if (args[0] < 1 && args[0] >= serverQueue.songs.length) {
            return message.channel.send("Lütfen Geçerli Bir Şarkı Numarası Girin!");
        }
        serverQueue.songs.splice(args[0] - 1, 1);
        return message.channel.send(`${args[0]} numaralı şarkı sıradan kaldırıldı`);
      } catch {
          serverQueue.connection.dispatcher.end();
          return message.channel.send("TEKRAR DENE LAN!")
      }
    }
};
