const Discord = require("discord.js");

module.exports = {
  name: "shuffle",
  aliases: ["sf", "shufflequeue"],
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Bir ses kanalına bağlanır mısın?");

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue)
      return message.channel.send(
        "Hiçbir şey oynatılmıyor."
      );
    
    const Current = await Queue.Songs.shift();
    
    Queue.Songs = Queue.Songs.sort(() => Math.random() - 0.5);
    await Queue.Songs.unshift(Current);
    
    const Embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Başarılı!")
    .setDescription("🎶 Sıra karıştırıldı")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Sıra karıştırıldı."));
  }
};
