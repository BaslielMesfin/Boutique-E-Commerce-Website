require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.WHATSAPP_PORT || 3001;
const OWNER_PHONE = process.env.OWNER_PHONE_NUMBER; // Must be in format '251911XXXXXX@c.us'

// Initialize WhatsApp Client with LocalAuth to persist session
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

let isReady = false;

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED. Scan the code below with your WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp Client is ready!');
    isReady = true;
});

client.on('authenticated', () => {
    console.log('WhatsApp Client is authenticated!');
});

client.on('auth_failure', msg => {
    console.error('WhatsApp Authentication failure', msg);
});

client.initialize();

// API endpoint to send notifications
app.post('/send-notification', async (req, res) => {
    if (!isReady) {
        return res.status(503).json({ error: 'WhatsApp client is not ready yet' });
    }

    try {
        const { orderId, customerName, customerPhone, deliveryLandmark, items } = req.body;

        if (!OWNER_PHONE) {
            console.warn('OWNER_PHONE_NUMBER is not set in environment variables');
            return res.status(500).json({ error: 'Owner phone number not configured' });
        }

        let message = `*NEW ORDER RECEIVED!*\n\n`;
        message += `*Order ID:* ${orderId}\n`;
        message += `*Customer:* ${customerName} (${customerPhone})\n`;
        message += `*Delivery Landmark:* ${deliveryLandmark}\n\n`;
        message += `*Items:*\n`;
        
        items.forEach((item, index) => {
            message += `${index + 1}. ${item.name} - Size: ${item.size}, Color: ${item.color} (Qty: ${item.quantity})\n`;
        });

        message += `\n_Please fulfill this order soon._`;

        await client.sendMessage(OWNER_PHONE, message);
        console.log(`Notification sent for order ${orderId}`);

        res.status(200).json({ success: true, message: 'Notification sent' });
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        res.status(500).json({ error: 'Failed to send notification' });
    }
});

app.listen(PORT, () => {
    console.log(`WhatsApp Service listening on port ${PORT}`);
});
