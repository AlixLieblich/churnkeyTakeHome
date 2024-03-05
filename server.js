const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// Churnkey-related endpoint
app.post('/getSecurityToken', (req, res) => {
	// Api key SHOULD be in a .secrets but I'm just gonna leave it here
    const API_KEY = "AXRNZYSdV4eBVP901H0Pw9Lp8cQuoSR6"; // Churnkey API Key
    const { STRIPE_CUSTOMER_ID } = req.body;

    const user_hash = crypto.createHmac("sha256", API_KEY)
        .update(STRIPE_CUSTOMER_ID)
        .digest("hex");
    res.json({ securityToken: user_hash });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

