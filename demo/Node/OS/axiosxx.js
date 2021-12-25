const axios = require('axios');
const FormData = require('form-data');
let data = new FormData();
data.append('param', '{"id": 1148143197908992,"maker": "陕梦测试集团管理员"}');
data.append('methodNum', '401');
data.append('appId', 'KBCEQnireaewa7Tx');

let config = {
  method: 'post',
  url: 'https://testopen.zhongfeitong.com/jupai/open/inter',
  headers: {
    'Content-Type': 'application/json',
    ...data.getHeaders()
  },
  data: data
};

axios(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
