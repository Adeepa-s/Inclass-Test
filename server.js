const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const GITHUB_CLIENT_ID = 'Ov23liu4nLpR7guHNAiV';
const GITHUB_CLIENT_SECRET = '730148d38b7d1566884fda53e90722daa49701f7'; // Replace with your actual secret

app.post('/api/auth/github', async (req, res) => {
  const { code } = req.body;

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code
      })
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.access_token) {
      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`
        }
      });

      const userData = await userResponse.json();

      res.json({
        name: userData.name || userData.login,
        email: userData.email || 'No public email',
        image: userData.avatar_url,
        provider: 'GitHub'
      });
    } else {
      res.status(400).json({ error: 'Failed to get access token' });
    }
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
