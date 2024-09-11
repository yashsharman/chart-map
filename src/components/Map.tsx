import { useQuery } from "@tanstack/react-query";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface Country {
  country: string;
  countryInfo: { lat: number; long: number };
  active: number;
  recovered: number;
  deaths: number;
}

function Map() {
  const position: [number, number] = [51.505, -0.09];

  const getCases = async (): Promise<Country[]> => {
    // Specify return type as Promise<Country[]>
    const response = await fetch("https://disease.sh/v3/covid-19/countries");
    const data = await response.json(); // Parse the JSON response
    return data;
  };

  const { data } = useQuery({
    queryKey: ["countries-cases"],
    queryFn: getCases,
  });

  return (
    <div id="map">
      <MapContainer
        center={position}
        zoom={5}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data &&
          data?.map((country: Country, i: number) => (
            <Marker
              key={i}
              position={[country.countryInfo.lat, country.countryInfo.long]}
            >
              <Popup>
                <div>
                  <span>Country: {country.country}</span>
                  <br />
                  <span>Total Active: {country.active}</span>
                  <br />
                  <span>Recovered cases: {country.recovered}</span>
                  <br />
                  <span>Deaths: {country.deaths}</span>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

export default Map;
