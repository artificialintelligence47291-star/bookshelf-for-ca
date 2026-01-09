const https = require('https');
const http = require('http');

module.exports = async (req, res) => {
    const { url, filename } = req.query;
    if (!url) { res.status(400).json({ error: 'URL required' }); return; }
    
    try {
        const pdfBuffer = await fetchPDF(url);
        const safeFilename = (filename || 'document').replace(/[^a-zA-Z0-9\s\-_]/g, '') + '.pdf';
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"`);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(pdfBuffer);
    } catch (error) {
        res.status(500).json({ error: 'Download failed', message: error.message });
    }
};

function fetchPDF(url) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        protocol.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/pdf,*/*', 'Referer': 'https://boslive.icai.org/' }
        }, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                fetchPDF(response.headers.location).then(resolve).catch(reject); return;
            }
            if (response.statusCode !== 200) { reject(new Error(`HTTP ${response.statusCode}`)); return; }
            const chunks = [];
            response.on('data', chunk => chunks.push(chunk));
            response.on('end', () => resolve(Buffer.concat(chunks)));
            response.on('error', reject);
        }).on('error', reject);
    });
}
