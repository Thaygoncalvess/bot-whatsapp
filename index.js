process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = "true";

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');

// ================== CLIENT ==================
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    executablePath: '/usr/bin/chromium-browser',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu',
      '--disable-features=site-per-process'
    ]
  }
});

// ================== QR ==================
client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

// ================== READY ==================
client.on('ready', () => {
  console.log('Bot pronto! 🚀');
  iniciarAgendamentos();
});

client.initialize();

// ================== GRUPOS ==================
const grupos = [
  {
    nome: "teste 5",
    id: "120363426340804676@g.us",
    dia: 1,
    hora: 19,
    minuto: 0
  },
  {
    nome: "teste 4",
    id: "120363423649429742@g.us",
    dia: 2,
    hora: 18,
    minuto: 0
  },
  {
    nome: "teste 3",
    id: "120363424328830430@g.us",
    dia: 5,
    hora: 10,
    minuto: 0
  },
  {
    nome: "teste 2",
    id: "120363408949833365@g.us",
    dia: 2,
    hora: 20,
    minuto: 0
  },
  {
    nome: "turma 1 teste",
    id: "120363427708398129@g.us",
    dia: 4,
    hora: 19,
    minuto: 0
  }
];

// ================== AGENDAMENTO ==================
function iniciarAgendamentos() {
  grupos.forEach(grupo => {

    // 🌞 09:00 no dia da aula
    cron.schedule(`0 9 * * ${grupo.dia}`, async () => {
      console.log(`Manhã: ${grupo.nome}`);

      await client.sendMessage(grupo.id,
`🌞 Bom dia pessoal!

📚 Hoje temos aula às ${grupo.hora}:${String(grupo.minuto).padStart(2, '0')} (horário de Brasília).

✨ Conto com todos vocês!
🤗🤗🤗`);
    });

    // ⏰ 15 min antes
    let hora = grupo.hora;
    let minuto = grupo.minuto - 15;

    if (minuto < 0) {
      minuto += 60;
      hora -= 1;
    }

    cron.schedule(`${minuto} ${hora} * * ${grupo.dia}`, async () => {
      console.log(`15min: ${grupo.nome}`);

      await client.sendMessage(grupo.id,
`⏰ Atenção!

Faltam 15 minutos para nossa aula!

📚 Nos vemos às ${grupo.hora}:${String(grupo.minuto).padStart(2, '0')} 😄`);
    });

  });
}