// ===============================
// MAPA
// ===============================
const map = L.map('map').setView([-10.2903, -36.5864], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

// ===============================
// CONTROLE DE CAMADA ATIVA
// ===============================
let camadaAtiva = null;

// ===============================
// FUNÇÃO PARA CARREGAR ROTA
// ===============================
function carregarRota(url, estilo) {
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error("Erro ao carregar o arquivo: " + url);
      }
      return res.json();
    })
    .then(dados => {

      // remove a rota anterior
      if (camadaAtiva) {
        map.removeLayer(camadaAtiva);
      }

      // cria nova camada
      const camada = L.geoJSON(dados, {
        style: estilo
      });

      // adiciona no mapa
      camada.addTo(map);

      // ajusta zoom automaticamente
      map.fitBounds(camada.getBounds());

      // salva como ativa
      camadaAtiva = camada;
    })
    .catch(err => {
      console.error("Erro:", err);
      alert("Erro ao carregar a rota. Veja o console (F12).");
    });
}

// ===============================
// FUNÇÃO PARA CARREGAR HORÁRIO
// ===============================
function mostrarHorarios(linha) {
  fetch('horarios.json')
    .then(res => res.json())
    .then(horarios => {
      const div = document.getElementById('conteudo-horarios');

      if (linha === 'linha1') {
        div.innerHTML = `
          <p><strong>Linha 1</strong></p>
          <p>Início: ${horarios.linha1.inicio}</p>
          <p>Intervalo: ${horarios.linha1.intervalo}</p>
        `;
      }

      if (linha === 'linha2') {
        div.innerHTML = `
          <p><strong>Linha 2</strong></p>
          <p>Início: ${horarios.linha2.inicio}</p>
          <p>Intervalo: ${horarios.linha2.intervalo}</p>
        `;
      }

      if (linha === 'circular') {
        div.innerHTML = `
          <p><strong>Circular</strong></p>
          <p>Início: ${horarios.circular.inicio}</p>
          <p>Intervalo: ${horarios.circular.intervalo}</p>
          <p>Final: ${horarios.circular.final}</p>
        `;
      }
    });
}

// ===============================
// BOTÕES
// ===============================
document.getElementById('btnLinha1').addEventListener('click', () => {
  carregarRota('rotas/linha1.json', { color: 'blue', weight: 4 });
  mostrarHorarios('linha1');
});

document.getElementById('btnLinha2').addEventListener('click', () => {
  carregarRota('rotas/linha2.json', {
    color: 'red',
    weight: 4
  });
  mostrarHorarios('linha2');
});

document.getElementById('btnLinha3').addEventListener('click', () => {
  carregarRota('rotas/linha3.json', {
    color: 'green',
    weight: 4
  });
  mostrarHorarios('linha3');
});

document.getElementById('btnCircular').addEventListener('click', () => {
  carregarRota('rotas/circular.json', {
    color: 'orange',
    weight: 4,
  });
  mostrarHorarios('circular');
});

document.getElementById('btnSesi').addEventListener('click', () => {
  carregarRota('rotas/sesi.json', {
    color: '#ecf45c',
    weight: 4
  });
  mostrarHorarios('sesi');
});
