const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const {solveDatabase} = require('..../Functions/solveDatabase');

module.exports = {
  name: "play",
  description: "To play songs :D",
  usage: "<song_name>",
  aliases: ["p", "oynat"],

  run: async function(client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel) {
      message.channel.send("Um.. Bu komutu kullanmadan önce bir ses kanalında olmanız gerekiyor");
    }

    if (!message.guild.me.hasPermission("CONNECT")) {
      message.channel.send({
        embed: {
          color: "FF0000",
          description:
            "<:emoji_17:763367241327706118> Ses kanalına bağlanma iznim yok."
        }
      });
    }
    if (!message.guild.me.hasPermission("SPEAK")) {
      message.channel.send({
        embed: {
          color: "FF0000",
          description:
            "<:emoji_17:763367241327706118>Müzik çalmak için konuşma iznine ihtiyacım var"
        }
      });
    }
    var searchString = args.join(" ");
    if (!searchString) {
      message.channel.send("<:emoji_17:763367241327706118> bana şarkının adını veya şarkının bağlantısını vermelisin");
    }

    var serverQueue = message.client.queue.get(message.guild.id);

    var searched = await yts.search(searchString);
    if (searched.videos.length === 0) {
      message.channel.send("Bu şarkıyı bulamıyorum. Link ile dener misin acaba?");
    }
    var songInfo = searched.videos[0];

    const song = {
      id: songInfo.videoId,
      title: Util.escapeMarkdown(songInfo.title),
      views: String(songInfo.views).padStart(10, " "),
      url: songInfo.url,
      ago: songInfo.ago,
      duration: songInfo.duration.toString(),
      img: songInfo.image,
      req: message.author
    };

    if (serverQueue) {
      serverQueue.songs.push(song);
      let thing = new MessageEmbed()
        .setTitle("Şarkı sıraya eklendi")
        .setImage(song.img)
        .setColor("ORANGE")
        .setDescription(`**Şarkı Adı** [${song.title}](${song.url}) \n **Dakika** ${song.duration} \n **Şu kişi tarafından istendi:** [${message.author}`)
        .setFooter(`Solve Music`);
      return message.channel.send(thing);
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 3.5,
      playing: true
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async song => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
         message.client.queue.delete(message.guild.id);
        return;
      }

      const dispatcher = queue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", error => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 5);
      let thing = new MessageEmbed()
        .setTitle("Oynatılmaya başlandı.")
        .setDescription(
          `
**Şarkı Adı**   
[${song.title}](${song.url})     

**Dakika**
${song.duration}

**Şu kişi tarafından istendi**
[${message.author}]

`
        )

        .setImage(song.img)
        .setColor("GREEN")
        .setFooter(`Solve Music`);
      queue.textChannel.send(thing);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      channel.guild.voice.setSelfDeaf(true);
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`${error} bu hatadan dolayı ses kanalına katılamadım.`);
      message.client.queue.delete(message.guild.id);
      //await channel.leave();
      return console.log(
        `${error} bu hatadan dolayı ses kanalına katılamadım.`,
        message.channel
      );
    }


   solveDatabase.guckaydet(song.title, song.duration, song.ago)


  }
};
