const axios = require('axios');

axios
  .get('http://localhost:3000/folder-framework', {
    params: {
      folderPath: './store-api',
    },
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
