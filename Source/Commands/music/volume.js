
module.exports = {
        name: 'volume',
        aliases: ["vol"],
       run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("SES KANALINA KATILIN!");
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("Bot İle Aynı Kanalda Olmalısınız!");
          }
        const serverQueue = client.queue.get(message.guild.id);
        if (!serverQueue){message.channel.send("Oynayan bir şey yok!")}
        if (!args[0]) return message.channel.send(`Geçerli ses düzeyi: **${serverQueue.volume}**`);
      try {
        serverQueue.volume = args[0];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
        return message.channel.send(`Sesi **${args[0]}** olarak ayarladım`);
      } catch {
          return message.channel.send("TEKRAR DENE LANĞ!");
      }
    }
};
