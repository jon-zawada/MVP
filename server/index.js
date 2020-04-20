/* eslint-disable object-shorthand */
/* eslint-disable import/newline-after-import */
// eslint-disable-next-line import/newline-after-import
const express = require('express');
const app = express();
const unirest = require('unirest');
const path = require('path');
const port = 3000;
const config = require('../config.js');

app.use('/', express.static(path.join(__dirname, '/../client/dist')));

app.get('/api/tides', (req, res) => {
  // console.log(req.query);
	let { lat } = req.query;
	let { lon } = req.query;
  let uniReq = unirest('GET', 'https://tides.p.rapidapi.com/tides');
  uniReq.query({
    latitude: lat,
    longitude: lon
  });

  uniReq.headers({
    'x-rapidapi-host': 'tides.p.rapidapi.com',
    'x-rapidapi-key': config.tideToken
  });

  uniReq.end((uniRes) => {
    if (uniRes.error) throw new Error(uniRes.error);

    res.send(uniRes.body);
  });
});

app.get('/api/coordinates', (req, res) => {
	let { location } = req.query;
	// console.log(location);
	let uniReq = unirest('GET', 'https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php');

	uniReq.query({
		location: location
	});

	uniReq.headers({
		'x-rapidapi-host': 'devru-latitude-longitude-find-v1.p.rapidapi.com',
		'x-rapidapi-key': config.locationToken
	});

	uniReq.end((uniRes) => {
		if (uniRes.error) throw new Error(uniRes.error);

		res.send(uniRes.body);
	});
});


app.listen(port, () => console.log(`MVP listening at http://localhost:${port}`));
