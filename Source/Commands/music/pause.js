module.exports = {
  name: "pause",
  aliases: ["durdur"],
  run: async (client, message, args) => {
    const serverQueue = client.queue.get(message.guild.id);
    const { channel } = message.member.voice;
    try {
      if (!channel)
        return message.channel.send(
          "Umm... müziği duraklatmak için bir ses kanalında olmanız gerekiyor."
        );
      if (message.guild.me.voice.channel !== message.member.voice.channel) {
        return message.channel.send(
          "MÜZİĞİ DURDURMAK İSTİYORSANIZ AYNI SES KANALINDA OLMAK ZORUNDASINIZ"
        );
      }
      if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause(true);
        return message.channel.send({
          embed: {
            color: "BLUE",
            description: "**⏸ Durduruldu**"
          }
        });
      }
      return message.channel.send("**Hiçbir şey çalmıyor.**");
    } catch {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
    }
  }
};
