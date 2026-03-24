const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot pronto! 🚀');
});

function mensagemManha(hora) {
    return `🕖✨ Horário da Aula ✨🕖

📌 Bom dia pessoal! Tudo bem com vocês?

📚 Lembrando que hoje temos aula às ${hora} (horário de Brasília).

⏳ Duração prevista: 60 minutos.

✨ Aguardo todos vocês 🤗🤗🤗`;
}

function mensagem15min(hora) {
    return `⏰🚨 Atenção!

📚 Nossa aula começa às ${hora} (horário de Brasília).

⏳ Faltam apenas 15 minutos!

✨ Bora pra aula 👀🔥`;
}

function enviar(grupo, mensagem) {
    client.sendMessage(grupo, mensagem);
    console.log(`Enviado para ${grupo}`);
}

client.initialize();

// SEGUNDA — 19h
cron.schedule('0 9 * * 1', () => {
    enviar('120363427708398129@g.us', mensagemManha("19:00"));
});
cron.schedule('45 18 * * 1', () => {
    enviar('120363427708398129@g.us', mensagem15min("19:00"));
});

// TERÇA — 18h
cron.schedule('0 9 * * 2', () => {
    enviar('120363408949833365@g.us', mensagemManha("18:00"));
});
cron.schedule('45 17 * * 2', () => {
    enviar('120363408949833365@g.us', mensagem15min("18:00"));
});

// TERÇA — 20h
cron.schedule('0 9 * * 2', () => {
    enviar('120363424328830430@g.us', mensagemManha("20:00"));
});
cron.schedule('45 19 * * 2', () => {
    enviar('120363424328830430@g.us', mensagem15min("20:00"));
});

// QUINTA — 19h
cron.schedule('0 9 * * 4', () => {
    enviar('120363423649429742@g.us', mensagemManha("19:00"));
});
cron.schedule('45 18 * * 4', () => {
    enviar('120363423649429742@g.us', mensagem15min("19:00"));
});

// SEXTA — 10h
cron.schedule('0 9 * * 5', () => {
    enviar('120363426340804676@g.us', mensagemManha("10:00"));
});
cron.schedule('45 9 * * 5', () => {
    enviar('120363426340804676@g.us', mensagem15min("10:00"));
});