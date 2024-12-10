module.exports = {
    getIndex: async (req, res) => {
      const tracks = await fetchGeolocation();
      res.render("tracklocations.ejs", {tracks});
    },
  };

  const fetchGeolocation = async () => {                                            //this function is fetching the location of the user 
    const geolocationApiKey = process.env.GEO_API_KEY;
    const geolocationUrl = `https://www.googleapis.com/geolocation/v1/geolocate?key=${geolocationApiKey}`;
    try {
      const geolocationResponse = await fetch(geolocationUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      if (!geolocationResponse.ok) {
        throw new Error(`Error: ${geolocationResponse.statusText}`);
      }
      const geolocationData = await geolocationResponse.json();
      const { lat, lng } = geolocationData.location;
      console.log(`User's location: Latitude: ${lat}, Longitude: ${lng}`);
      const data = await fetchNearbyRunningTracks(lat, lng);
      const tracks = data.results   
      console.log(data)                                          //this return the data blocked and nested one down (results)
      return tracks
    } catch (error) {
      console.error('Error fetching geolocation:', error.message);
    }
  };
  const fetchNearbyRunningTracks = async (lat, lng) => {
    const placesApiKey = process.env.PLACES_API_KEY;
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&keyword=running%20track&key=${placesApiKey}`;
    try {
      const placesResponse = await fetch(placesUrl);
      if (!placesResponse.ok) {
        throw new Error(`Error: ${placesResponse.statusText}`);
      }
      const placesData = await placesResponse.json();
      
    
      return placesData
    } catch (error) {
      console.error('Error fetching nearby running tracks:', error.message);
    }
  };








  