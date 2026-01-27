if (listingCoordinates) {
  const map = L.map("map").setView(
    [listingCoordinates[1], listingCoordinates[0]],
    13
  );

  // OpenStreetMap tiles (FREE)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Marker
  L.marker([listingCoordinates[1], listingCoordinates[0]])
    .addTo(map)
    .bindPopup("Property Location")
    .openPopup();
}
