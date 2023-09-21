// const { Storage } = require('@google-cloud/storage');
// const path = require('path');

// // Замените 'your-project-id' на ID вашего проекта.
// const storage = new Storage({ projectId: '116662230561559482029', keyFilename: path.join(__dirname, 'infra-fortress-399318-65125f29bd77.json') });

// module.exports = storage;
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: '116662230561559482029', // Замените на ваш ID проекта
  keyFilename: 'infra-fortress-399318-65125f29bd77.json', // Замените на путь к вашему ключу сервисного аккаунта
});

const bucketName = 'articles-img'; // Замените на имя вашего бакета

module.exports = {
  storage,
  bucketName,
};

