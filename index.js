const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined
    }
});

client.on('qr', qr => {
    console.log('Escaneie o QR Code abaixo:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot pronto! 🚀');
});

// ===== SUAS TURMAS =====
// ⚠️ EDITE SÓ DIA E HORÁRIO
const turmas = [
    {
        nome: "Teste 5",
        grupoId: "120363426340804676@g.us",
        dia: 1,
        hora: 10,
        minuto: 0
    },
    {
        nome: "Teste 4",
        grupoId: "120363423649429742@g.us",
        dia: 2,
        hora: 14,
        minuto: 0
    },
    {
        nome: "Teste 3",
        grupoId: "120363424328830430@g.us",
        dia: 3,
        hora: 16,
        minuto: 0
    },
    {
        nome: "Teste 2",
        grupoId: "120363408949833365@g.us",
        dia: 4,
        hora: 18,
        minuto: 0
    },
    {
        nome: "Turma 1",
        grupoId: "120363427708398129@g.us",
        dia: 5,
        hora: 19,
        minuto: 0
    }
];

// ===== MENSAGENS =====
function mensagemManha(nomeTurma, hora) {
    return `🕖✨ Bom dia ${nomeTurma}! ✨🕖

📚 Hoje temos aula às ${hora}h.

⏳ Fiquem atentos aqui no grupo!

✨ Aguardo vocês 🤗`;
}

function mensagemAntes(nomeTurma, hora) {
    return `⏰✨ Atenção ${nomeTurma}! ✨⏰

🚀 Faltam 15 minutos para a aula das ${hora}h!

📚 Preparem-se!

✨ Já já começamos 🤗`;
}

// ===== AGENDAMENTO =====
turmas.forEach(turma => {

    // 09:00 da manhã
    cron.schedule(`0 9 * * ${turma.dia}`, () => {
        client.sendMessage(turma.grupoId, mensagemManha(turma.nome, turma.hora));
        console.log(`Mensagem 09:00 enviada para ${turma.nome}`);
    });

    // 15 minutos antes
    let hora = turma.hora;
    let minuto = turma.minuto - 15;

    if (minuto < 0) {
        minuto = 60 + minuto;
        hora = hora - 1;
    }

    cron.schedule(`${minuto} ${hora} * * ${turma.dia}`, () => {
        client.sendMessage(turma.grupoId, mensagemAntes(turma.nome, turma.hora));
        console.log(`Mensagem 15min enviada para ${turma.nome}`);
    });

});

client.initialize();