const axios = require('axios');

module.exports = {
  config: {
    name: "imgvt",
    version: "0.0",
    author: "Siam",
    countDown: 5,
    role: 0,
    sortDescription: {
      en: 'any Image to Text convert'
    },
    category: "Fun",
  },
  onStart: async function ({ api, args, message, event }) {
    try {
      const link = encodeURIComponent(event.messageReply.attachments[0].url);
      const lado = await axios.get(`https://sandipapi.onrender.com/imgur?link=${link}`);
      const puti = lado.data.uploaded?.image;

      if (!puti) {
        throw new Error('Image not uploaded');
      }

      const apiUrl = `https://milanbhandari.onrender.com/ocr?imageUrl=${puti}`;

      axios.get(apiUrl)
        .then(response => {
          const text = response.data.responses[0].textAnnotations[0].description;
          message.reply({ body: `Text: ${text}` });
        })
        .catch(error => {
          message.reply(error.message);
        });
    } catch (error) {
      message.reply(error.message);
    }
  }
};
