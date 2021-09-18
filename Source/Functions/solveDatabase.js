const SarkiData = require('../Database/SarkiÖneri.js');
const GucsuzSarkiÖneri = require('../Database/GucsuzSarkiÖneri');



class solveDatabase {
  
  static async kaydet(sarki, sanatci, albumadi, yukleme, link) {
    let sarkidatas = await new SarkiData({
      Sarki: sarki,
      Sanatci: sanatci,
      AlbumAdi: albumadi,
      YuklemeTarih: yukleme,
      Links: link
    })   
    await sarkidatas.save();
  }

  static async guckaydet(sarki, dakika, yukleme) {
    let sarkidatas = await new GucsuzSarkiÖneri({
      Sarki: sarki,
      Dakika: dakika,
      YuklemeTarih: yukleme
    })
    await sarkidatas.save();
  }

}