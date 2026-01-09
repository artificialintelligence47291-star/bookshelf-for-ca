const https = require('https');
const http = require('http');

module.exports = async (req, res) => {
    const { url, filename } = req.query;

    if (!url) {
        res.status(400).json({ error: 'URL parameter is required' });
        return;
    }

    console.log(`📥 Downloading: ${filename || 'PDF'}`);
    console.log(`   From: ${url}`);

    try {
        // Fetch PDF from ICAI server
        const pdfBuffer = await fetchPDF(url);

        // Set headers for download
        const safeFilename = (filename || 'document').replace(/[^a-zA-Z0-9\s\-_]/g, '') + '.pdf';
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"`);
        res.setHeader('Content-Length', pdfBuffer.length);
        res.setHeader('Access-Control-Allow-Origin', '*');

        console.log(`✅ Downloaded: ${safeFilename} (${(pdfBuffer.length / 1024).toFixed(1)} KB)`);

        // Send the PDF
        res.status(200).send(pdfBuffer);

    } catch (error) {
        console.error(`❌ Download failed: ${error.message}`);
        res.status(500).json({
            error: 'Failed to download PDF',
            message: error.message
        });
    }
};

function fetchPDF(url) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;

        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/pdf,*/*',
                'Referer': 'https://boslive.icai.org/'
            }
        };

        protocol.get(url, options, (response) => {
            // Handle redirects
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                fetchPDF(response.headers.location).then(resolve).catch(reject);
                return;
            }

            if (response.statusCode !== 200) {
                reject(new Error(`HTTP ${response.statusCode}`));
                return;
            }

            const chunks = [];
            response.on('data', chunk => chunks.push(chunk));
            response.on('end', () => resolve(Buffer.concat(chunks)));
            response.on('error', reject);
        }).on('error', reject);
    });
}
