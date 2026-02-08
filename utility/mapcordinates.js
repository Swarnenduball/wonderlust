module.exports = async function getCoordinates(place) {
  const encoded = encodeURIComponent(place);

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encoded}`
  );

  const data = await response.json();

  if (!data.length) return null;

  return [data[0].lat, data[0].lon];
};
