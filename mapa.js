 // Centralizando em Penedo
  var map = L.map('map').setView([-10.2903, -36.5864], 14);

  // Mapa do OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  // Exemplo de rota de ônibus
  var rota = [
    [-10.292164, -36.585377],
    [-10.291663, -36.585749],
    [-10.291163, -36.585108],
    [-10.290741, -36.584581],
    [-10.290027, -36.583657],
    [-10.289298, -36.584047]
  ];

  // Desenhar linha
  var linha = L.polyline(rota, {color: 'blue'}).addTo(map);

  // Marcadores (paradas)
  rota.forEach(p => {
    L.marker(p).addTo(map);
  });

  map.fitBounds(linha.getBounds());