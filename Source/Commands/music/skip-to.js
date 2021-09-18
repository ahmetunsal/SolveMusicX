module.exports = {
  name: "skipto",

  run: async (client, message, args) => {
    if (!args[0])
      return message.channel.send("**Lütfen Bir Şarkı Numarası Girin!**");

    const { channel } = message.member.voice;
    if (!channel) return message.channel.send("SES KANALINA KATILIN!");
    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) {
      message.channel.send("Bu sunucuda hiçbir şey oynatılmıyor");
    }

    if (message.guild.me.voice.channel !== message.member.voice.channel) {
      return message.channel.send(
        "Bot İle Aynı Kanalda Olmalısınız!"
      );
    }

    if (args[0] < 1 && args[0] >= serverQueue.songs.length) {
      return message.channel.send("**Lütfen Geçerli Bir Şarkı Numarası Girin!**");
    }
    try {
      serverQueue.songs.splice(0, args[0] - 2);
      serverQueue.connection.dispatcher.end();
      return;
    } catch {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
      return message.channel.send("PLS TEKRAR DENE!");
    }
  }
};
