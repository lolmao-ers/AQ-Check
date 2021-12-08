const https = require('https');
const fs = require('fs');

let x = 1000;
let url = `https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&offset=${x}&limit=1000`



for(let i = 0; i < 100; i++){

    https.get(url, (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    fs.writeFileSync(`${process.cwd()}/hello.json`,data);
  });

//   console.log(process.cwd());

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
x+= 1000;
}