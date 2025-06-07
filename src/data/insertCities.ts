const mongoose = require('mongoose');

const cities = [
  {
    name: 'Seoul',
    country: 'South Korea',
    continent: 'Asia',
    population: 25.674,
  },
  { name: 'Mumbai', country: 'India', continent: 'Asia', population: 19.98 },
  {
    name: 'Lagos',
    country: 'Nigeria',
    continent: 'Africa',
    population: 13.463,
  },
  { name: 'Beijing', country: 'China', continent: 'Asia', population: 19.618 },
  { name: 'Shanghai', country: 'China', continent: 'Asia', population: 25.582 },
  { name: 'Osaka', country: 'Japan', continent: 'Asia', population: 19.281 },
  { name: 'Cairo', country: 'Egypt', continent: 'Africa', population: 20.076 },
  { name: 'Tokyo', country: 'Japan', continent: 'Asia', population: 37.4 },
  { name: 'Karachi', country: 'Pakistan', continent: 'Asia', population: 15.4 },
  {
    name: 'Dhaka',
    country: 'Bangladesh',
    continent: 'Asia',
    population: 19.578,
  },
  {
    name: 'Rio de Janeiro',
    country: 'Brazil',
    continent: 'South America',
    population: 13.293,
  },
  {
    name: 'São Paulo',
    country: 'Brazil',
    continent: 'South America',
    population: 21.65,
  },
  {
    name: 'Mexico City',
    country: 'Mexico',
    continent: 'North America',
    population: 21.581,
  },
  { name: 'Delhi', country: 'India', continent: 'Asia', population: 28.514 },
  {
    name: 'Buenos Aires',
    country: 'Argentina',
    continent: 'South America',
    population: 14.967,
  },
  { name: 'Kolkata', country: 'India', continent: 'Asia', population: 14.681 },
  {
    name: 'New York',
    country: 'United States',
    continent: 'North America',
    population: 18.819,
  },
  {
    name: 'Manila',
    country: 'Philippines',
    continent: 'Asia',
    population: 13.482,
  },
  {
    name: 'Chongqing',
    country: 'China',
    continent: 'Asia',
    population: 14.838,
  },
  {
    name: 'Istanbul',
    country: 'Turkey',
    continent: 'Europe',
    population: 14.751,
  },
];

const citySchema = new mongoose.Schema({
  name: String,
  country: String,
  continent: String,
  population: Number,
});

const City = mongoose.model('City', citySchema);

export async function insertCitiesIfEmpty() {
  const count = await City.countDocuments();
  if (count === 0) {
    await City.insertMany(cities);
    console.log('✅ Cities inserted!');
  } else {
    console.log('⚠️ Cities already exist, skipping insert');
  }

  // ערים באסיה עם אוכלוסייה מעל 20 מיליון, ממויינות מהכי הרבה לפחות:

  //   AGGREGATED CITIES //
  const asianCities = await City.aggregate([
    {
      $facet: {
        asianCities: [{ $match: { continent: 'Asia' } }, { $count: 'count' }],
        europeanCities: [
          { $match: { continent: 'Europe' } },
          { $count: 'count' },
        ],
      },
    },
  ]);
  console.log('🌏 Asian Cities:', JSON.stringify(asianCities));
}
