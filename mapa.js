// ===============================
// MAPA
// ===============================
const map = L.map('map').setView([-10.2903, -36.5864], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

// ===============================
// 🆕 ÍCONE PERSONALIZADO
// ===============================
const iconeParada = L.icon({
  iconUrl: 'img/parada.png', // coloque sua imagem aqui
  iconSize: [14, 14],
  iconAnchor: [5, 14],
  popupAnchor: [0, -14]
});

// ===============================
// CONTROLE DE CAMADA ATIVA
// ===============================
let camadaAtiva = null;

// ===============================
// FUNÇÃO PARA CARREGAR ROTA
// ===============================
function carregarRota(url, estilo) {
  fetch(url)
    .then(res => res.json())
    .then(dados => {

      // remove a rota anterior
      if (camadaAtiva) {
        map.removeLayer(camadaAtiva);
      }

      // cria nova camada
      const camada = L.geoJSON(dados, {

        // 🆕 AQUI MUDA OS PONTOS
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, { icon: iconeParada });
        },

        // 🆕 AQUI GARANTE QUE SÓ A LINHA RECEBE ESTILO
        style: function (feature) {
          if (feature.geometry.type === "LineString") {
            return estilo;
          }
        }

      });

      // adiciona no mapa
      camada.addTo(map);

      // ajusta zoom automaticamente
      map.fitBounds(camada.getBounds());

      // salva como ativa
      camadaAtiva = camada;
    })
}

// ===============================
// FUNÇÃO PARA CARREGAR HORÁRIO
// ===============================
function mostrarInfoLinha(linha) {
  fetch('linhas.json')
    .then(res => res.json())
    .then(dados => {
      const infoDiv = document.getElementById('info-linha');
      const trajetoDiv = document.getElementById('trajeto-linha');

      const linhaData = dados[linha];

      // Informações principais
      infoDiv.innerHTML = `
        <h3>${linha.toUpperCase()} - Informações</h3>
        <p><strong>Ponto de saída:</strong> ${linhaData.info.ponto_saida}</p>
        <p><strong>Hora inicial:</strong> ${linhaData.info.hora_inicial}</p>
        <p><strong>Dias:</strong> ${linhaData.info.dias}</p>
        <p><strong>Intervalo:</strong> ${linhaData.info.intervalo}</p>
      `;

      // Descrição do trajeto
      trajetoDiv.innerHTML = `
        <h3>Trajeto</h3>
        <p><strong>Ida:</strong> ${linhaData.trajeto.ida.join(' → ')}</p>
        <p><strong>Volta:</strong> ${linhaData.trajeto.volta.join(' → ')}</p>
        <p><strong>Observação:</strong> ${linhaData.trajeto.observacao}</p>
      `;
    });
}

// ===============================
// BOTÕES
// ===============================
document.getElementById('btnLinha1').addEventListener('click', () => {
  carregarRota('rotas/linha1.json', { 
    color: 'blue',
    weight: 4 
  });
  mostrarInfoLinha('linha1');
});

document.getElementById('btnLinha2').addEventListener('click', () => {
  carregarRota('rotas/linha2.json', {
    color: 'red',
    weight: 4
  });
  mostrarInfoLinha('linha2');
});

document.getElementById('btnLinha3').addEventListener('click', () => {
  carregarRota('rotas/linha3.json', {
    color: 'green',
    weight: 4
  });
  mostrarInfoLinha('linha3');
});

document.getElementById('btnCircular').addEventListener('click', () => {
  carregarRota('rotas/circular.json', {
    color: 'orange',
    weight: 4,
  });
  mostrarInfoLinha('circular');
});

document.getElementById('btnSesi').addEventListener('click', () => {
  carregarRota('rotas/sesi.json', {
    color: 'yellow',
    weight: 4
  });
  mostrarInfoLinha('sesi');
});
