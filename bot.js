const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const readline = require('readline');

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot pronto! 🚀');
    console.log('Digite qualquer coisa e aperte ENTER');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', async () => {
        await client.sendMessage(
            '553184763717-1575588905@g.us',
            '🔥 TESTE MANUAL FUNCIONOU!'
        );
        console.log('Mensagem enviada!');
    });
});

client.initialize();