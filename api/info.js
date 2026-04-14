import axios from 'axios';

export default async function handler(req, res) {
  const airport_id = req.query.id || 'KIND';

  const weather = await axios.get(`https://aviationweather.gov/api/data/metar?ids=${airport_id}&format=json`);

  return res.json(weather.data[0]);
}
