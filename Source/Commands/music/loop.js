module.exports = {
  name: "loop",
  aliases: ["repeat", "döngü"],
  run: async (client, message, args) => {
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "Üzgünüm ama müziği döngüye almak için bir ses kanalında olmanız gerekiyor!"
      );
    const serverQueue = client.queue.get(message.guild.id);
    try {
      if (!serverQueue)
        return message.channel.send("Hiçbir şey oynatılmıyor.");
      if (message.guild.me.voice.channel !== message.member.voice.channel) {
        return message.channel.send(
          "**Bot İle Aynı Kanalda Olmalısınız!**"
        );
      }
      if (!serverQueue.loop) {
        serverQueue.loop = true;
        return message.channel.send({
          embed:{
        color: "BLUE",
        description:"🔁 Döngü Açıldı."}});
      } else {
        serverQueue.loop = false;
        return message.channel.send(
          {embed: {
            color: "BLUE",
            description:"🔁 Döngü Kapatıldı."}});
      }
    } catch {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
      return message.channel.send(
        "**Bir şeyler yanlış gitti. Sorun devam ederse geliştirici ile iletişime geçin!**"
      );
    }
  }
};
