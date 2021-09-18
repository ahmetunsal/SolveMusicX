const RandomSong = require('@chatandshare/random-song');
const random = new RandomSong("db97aab63708ddc21cb254711ef9de44");
const { MessageEmbed } = require('discord.js');
const {solveDatabase} = require('..../Functions/solveDatabase');
const GucsuzSarki = require('..../Database/GucsuzSarkiOneri');


module.exports = {
  name: "öneri",
  aliases: [""],
  run: async(client, message, args) => {

    let rsa = await random.song();

    
    var searchString = []
    var serverQueue = message.client.queue.get(message.guild.id);
    var searched = await yts.search(searchString);
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
    
    
    function embed(msg) {
      let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(`Musixmacth API ile oluşturuldu.`).setTimestamp().setDescription(msg)
    message.channel.send(embed)
    } 

  if(args[0] && args[0].includes('rastgele')) {
    let sark = rsa.track_name.replace(" " || "," || "-" || "." || ":" || ";" || "?" || "'" || "!" || "&" || "%" || "#" || "^" || "/" || "=" || "*" || "_" || "+" || "-" , "%20").toLowerCase()/* + rsa.track_name.replace(" " || "," || "-" || "." || ":" || ";" || "?" || "'" || "!" || "&" || "%" || "#" || "^" || "/" || "=" || "*" || "_" || "+" || "-" , "%20").toUpperCase();
  */

    embed(` \`Şarkı:\` **${rsa.track_name}** \n \`Sanatçı:\` **${rsa.artist_name}** \n \`Albüm Adı:\` **${rsa.album_name}**, \n \`Yüklenme Tarihi:\` **${rsa.updated_time}** \n\n [Bu Şarkıya Göz Atın!](${rsa.track_share_url}) \n <:musix:888521382319767672> [MusixmatchAPI](https://developer.musixmatch.com/plans) \n <:spotify:888521382089072682> [Bu Şarkıyı Spotify'da Dinleyin!](https://open.spotify.com/search/${sark})`)
    solveDatabase.kaydet(rsa.track_name, rsa.artist_name, rsa.album_name, rsa.updated_time, rsa.track_share_url )
    
  }

  
  if(args[0] && args[0].includes('r-türk')) {

    await GucsuzSarki.find({ Sarki: song.title }, async(err, data) => {
      if(err)return;
      if(!data) return embed(`Data'mızda şuanlık şarkı yok.`)
      let musix = data.map(x => `**Şarkı:** ${x.Sarki} \n **Dakika:** ${x.Dakika} \n **Yüklenme Tarihi:** ${x.YuklemeTarih} `)
      embed(musix)
    })
  }

  }
}



//