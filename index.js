const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');

// ================== CONFIG DO BOT ==================
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ]
  }
});

// ================== QR CODE ==================
client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

// ================== BOT PRONTO ==================
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
    dia: 1, // segunda
    hora: 19,
    minuto: 0
  },
  {
    nome: "teste 4",
    id: "120363423649429742@g.us",
    dia: 2, // terça
    hora: 18,
    minuto: 0
  },
  {
    nome: "teste 3",
    id: "120363424328830430@g.us",
    dia: 5, // sexta
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
    dia: 4, // quinta
    hora: 19,
    minuto: 0
  }
];

// ================== FUNÇÃO DE AGENDAMENTO ==================
function iniciarAgendamentos() {
  grupos.forEach(grupo => {

    // 🔔 MENSAGEM 09:00 NO DIA DA AULA
    cron.schedule(`0 9 * * ${grupo.dia}`, async () => {
      console.log(`Mensagem manhã para ${grupo.nome}`);

      await client.sendMessage(grupo.id,
`🌞 Bom dia pessoal!

📚 Hoje temos aula às ${grupo.hora}:${String(grupo.minuto).padStart(2, '0')} (horário de Brasília).

✨ Conto com a presença de todos!
🤗🤗🤗`);
    });

    // ⏰ 15 MIN ANTES DA AULA
    let hora = grupo.hora;
    let minuto = grupo.minuto - 15;

    if (minuto < 0) {
      minuto = 60 + minuto;
      hora = hora - 1;
    }

    cron.schedule(`${minuto} ${hora} * * ${grupo.dia}`, async () => {
      console.log(`Lembrete 15min para ${grupo.nome}`);

      await client.sendMessage(grupo.id,
`⏰ Atenção pessoal!

Faltam 15 minutos para nossa aula!

📚 Nos vemos já já às ${grupo.hora}:${String(grupo.minuto).padStart(2, '0')} 😄`);
    });

  });
}