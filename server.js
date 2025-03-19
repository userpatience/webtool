const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Constants for API configuration
const API_BASE_URL = 'https://load-balancer.siegestats.net/';
const DEFAULT_HEADERS = {
  'Quasar-Api-Key': '425e1333-a6e2-46c5-aeeb-a2cfa0bbec3f',
  'User-Agent': 'UbiServices_SDK_2022.Release.39_PC64_ansi_static'
};
const SIEGE_APP_ID = 'e3d5ea9e-50bd-43b7-88bf-39794f4e3d40';

// File for accounts (as JSON)
const ACCOUNTS_FILE = path.join(__dirname, 'accounts.json');

// Helper functions
function loadAccounts() {
  if (!fs.existsSync(ACCOUNTS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(ACCOUNTS_FILE, 'utf8');
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing accounts file:', error);
    return [];
  }
}

function saveAccounts(accounts) {
  fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2), 'utf8');
}

// API routes
app.post('/api/create-account', async (req, res) => {
  try {
    const { mailInput, country, legalOptinsKey } = req.body;
    
    // Generate random string
    const randomString = generateRandomString(10);
    const emailParts = mailInput.split('@');
    const emailUsername = emailParts[0];
    const emailDomain = emailParts[1];
    const generatedEmail = `${emailUsername}+${randomString}@${emailDomain}`;
    
    // Create account data for request
    const accountData = {
      email: generatedEmail,
      confirmedEmail: generatedEmail,
      firstName: null,
      lastName: null,
      legalOptinsKey: legalOptinsKey,
      nameOnPlatform: randomString,
      isDateOfBirthApprox: false,
      age: null,
      dateOfBirth: "2004-04-24T00:00:00.00000Z",
      password: "D1gnityHere*",
      country: country,
      preferredLanguage: "en"
    };
    
    // Send request to Ubisoft
    const response = await axios.post(`${API_BASE_URL}v1/users`, accountData, {
      headers: {
        ...DEFAULT_HEADERS,
        'Content-Type': 'application/json',
        'Ubi-AppId': 'f9524717-e8af-431b-a31f-783e136b3a5c',
        'Ubi-RequestedPlatformType': 'uplay'
      }
    });
    
    // Created account
    const ubisoftToken = response.data;
    const newAccount = {
      email: generatedEmail,
      password: "D1gnityHere*",
      username: ubisoftToken.username,
      countryCode: country,
      country: getCountryName(country)
    };
    
    // Save account
    const accounts = loadAccounts();
    accounts.push(newAccount);
    saveAccounts(accounts);
    
    res.json(newAccount);
  } catch (error) {
    console.error('Error creating account:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to create account', 
      details: error.response?.data || error.message 
    });
  }
});

app.get('/api/accounts', (req, res) => {
  try {
    const accounts = loadAccounts();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load accounts' });
  }
});

app.delete('/api/accounts', (req, res) => {
  try {
    saveAccounts([]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear accounts' });
  }
});

app.post('/api/get-ip-location', async (req, res) => {
  try {
    const { ipAddress, email, password } = req.body;
    const headers = { ...DEFAULT_HEADERS, 'Ubi-AppId': SIEGE_APP_ID };
    
    // If email and password are provided, authenticate
    if (email && password) {
      const authString = Buffer.from(`${email}:${password}`).toString('base64');
      const authResponse = await axios.post(`${API_BASE_URL}v1/profiles/sessions`, 
        { "Content-Type": "application/json", "rememberMe": "false" },
        {
          headers: {
            ...DEFAULT_HEADERS,
            'Content-Type': 'application/json',
            'Ubi-AppId': SIEGE_APP_ID,
            'Authorization': `Basic ${authString}`
          }
        }
      );
      
      const ubisoftToken = authResponse.data;
      headers['Authorization'] = `ubi_v1 t=${ubisoftToken.ticket}`;
      headers['Ubi-SessionId'] = ubisoftToken.sessionId;
    }
    
    // Query IP location
    const response = await axios.get(`${API_BASE_URL}v2/iplocation/${ipAddress}`, {
      headers: headers
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error getting IP location:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to get IP location', 
      details: error.response?.data || error.message 
    });
  }
});

// Support-related API endpoints
app.post('/api/create-support-case', async (req, res) => {
  try {
    const { email, password, subject, description, product, category } = req.body;
    
    if (!email || !password || !subject || !description) {
      return res.status(400).json({ error: 'Missing parameters: Email, password, subject and description are required' });
    }
    
    // Authenticate with Ubisoft account
    const authString = Buffer.from(`${email}:${password}`).toString('base64');
    const authResponse = await axios.post(`${API_BASE_URL}v1/profiles/sessions`, 
      { "Content-Type": "application/json", "rememberMe": "false" },
      {
        headers: {
          ...DEFAULT_HEADERS,
          'Content-Type': 'application/json',
          'Ubi-AppId': SIEGE_APP_ID,
          'Authorization': `Basic ${authString}`
        }
      }
    );
    
    const ubisoftToken = authResponse.data;
    
    // Create support case
    const supportCaseData = {
      "subject": subject,
      "description": description,
      "product": product || "general", // Default: general
      "category": category || "account", // Default: account
      "locale": "en-US",
      "platform": "PC",
      "severity": "normal"
    };
    
    const supportResponse = await axios.post(`${API_BASE_URL}v1/support/cases`, supportCaseData, {
      headers: {
        ...DEFAULT_HEADERS,
        'Content-Type': 'application/json',
        'Ubi-AppId': SIEGE_APP_ID,
        'Authorization': `ubi_v1 t=${ubisoftToken.ticket}`,
        'Ubi-SessionId': ubisoftToken.sessionId
      }
    });
    
    // Save support case in file
    const supportCasesFile = path.join(__dirname, 'support_cases.json');
    let cases = [];
    
    if (fs.existsSync(supportCasesFile)) {
      const data = fs.readFileSync(supportCasesFile, 'utf8');
      try {
        cases = JSON.parse(data);
      } catch (error) {
        console.error('Error parsing support cases file:', error);
      }
    }
    
    const caseInfo = {
      id: supportResponse.data.id,
      subject: subject,
      description: description,
      status: supportResponse.data.status || 'pending',
      createdAt: new Date().toISOString(),
      email: email,
      product: product || "general",
      category: category || "account"
    };
    
    cases.push(caseInfo);
    fs.writeFileSync(supportCasesFile, JSON.stringify(cases, null, 2), 'utf8');
    
    res.json(caseInfo);
  } catch (error) {
    console.error('Error creating support case:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to create support case', 
      details: error.response?.data || error.message 
    });
  }
});

// Endpoint to get all support cases
app.get('/api/support-cases', (req, res) => {
  try {
    const supportCasesFile = path.join(__dirname, 'support_cases.json');
    if (!fs.existsSync(supportCasesFile)) {
      return res.json([]);
    }
    
    const data = fs.readFileSync(supportCasesFile, 'utf8');
    const cases = JSON.parse(data);
    res.json(cases);
  } catch (error) {
    console.error('Error fetching support cases:', error);
    res.status(500).json({ error: 'Failed to fetch support cases' });
  }
});

// Endpoint to get a support case by ID
app.get('/api/support-cases/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.query;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Authenticate with Ubisoft account
    const authString = Buffer.from(`${email}:${password}`).toString('base64');
    const authResponse = await axios.post(`${API_BASE_URL}v1/profiles/sessions`, 
      { "Content-Type": "application/json", "rememberMe": "false" },
      {
        headers: {
          ...DEFAULT_HEADERS,
          'Content-Type': 'application/json',
          'Ubi-AppId': SIEGE_APP_ID,
          'Authorization': `Basic ${authString}`
        }
      }
    );
    
    const ubisoftToken = authResponse.data;
    
    // Get support case details
    const caseResponse = await axios.get(`${API_BASE_URL}v1/support/cases/${id}`, {
      headers: {
        ...DEFAULT_HEADERS,
        'Ubi-AppId': SIEGE_APP_ID,
        'Authorization': `ubi_v1 t=${ubisoftToken.ticket}`,
        'Ubi-SessionId': ubisoftToken.sessionId
      }
    });
    
    // Optional: Get comments for the case
    const commentsResponse = await axios.get(`${API_BASE_URL}v1/support/cases/${id}/comments`, {
      headers: {
        ...DEFAULT_HEADERS,
        'Ubi-AppId': SIEGE_APP_ID,
        'Authorization': `ubi_v1 t=${ubisoftToken.ticket}`,
        'Ubi-SessionId': ubisoftToken.sessionId
      }
    });
    
    const caseDetails = {
      ...caseResponse.data,
      comments: commentsResponse.data || []
    };
    
    res.json(caseDetails);
  } catch (error) {
    console.error('Error fetching support case details:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to fetch support case details', 
      details: error.response?.data || error.message 
    });
  }
});

// Endpoint to add a comment to a support case
app.post('/api/support-cases/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, comment } = req.body;
    
    if (!email || !password || !comment) {
      return res.status(400).json({ error: 'Email, password and comment are required' });
    }
    
    // Authenticate with Ubisoft account
    const authString = Buffer.from(`${email}:${password}`).toString('base64');
    const authResponse = await axios.post(`${API_BASE_URL}v1/profiles/sessions`, 
      { "Content-Type": "application/json", "rememberMe": "false" },
      {
        headers: {
          ...DEFAULT_HEADERS,
          'Content-Type': 'application/json',
          'Ubi-AppId': SIEGE_APP_ID,
          'Authorization': `Basic ${authString}`
        }
      }
    );
    
    const ubisoftToken = authResponse.data;
    
    // Add comment
    const commentResponse = await axios.post(`${API_BASE_URL}v1/support/cases/${id}/comments`, 
      { text: comment },
      {
        headers: {
          ...DEFAULT_HEADERS,
          'Content-Type': 'application/json',
          'Ubi-AppId': SIEGE_APP_ID,
          'Authorization': `ubi_v1 t=${ubisoftToken.ticket}`,
          'Ubi-SessionId': ubisoftToken.sessionId
        }
      }
    );
    
    res.json(commentResponse.data);
  } catch (error) {
    console.error('Error adding comment to support case:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to add comment to support case', 
      details: error.response?.data || error.message 
    });
  }
});

// Endpoint to close a support case
app.put('/api/support-cases/:id/close', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Authenticate with Ubisoft account
    const authString = Buffer.from(`${email}:${password}`).toString('base64');
    const authResponse = await axios.post(`${API_BASE_URL}v1/profiles/sessions`, 
      { "Content-Type": "application/json", "rememberMe": "false" },
      {
        headers: {
          ...DEFAULT_HEADERS,
          'Content-Type': 'application/json',
          'Ubi-AppId': SIEGE_APP_ID,
          'Authorization': `Basic ${authString}`
        }
      }
    );
    
    const ubisoftToken = authResponse.data;
    
    // Close support case
    const closeResponse = await axios.put(`${API_BASE_URL}v1/support/cases/${id}/close`, {}, {
      headers: {
        ...DEFAULT_HEADERS,
        'Content-Type': 'application/json',
        'Ubi-AppId': SIEGE_APP_ID,
        'Authorization': `ubi_v1 t=${ubisoftToken.ticket}`,
        'Ubi-SessionId': ubisoftToken.sessionId
      }
    });
    
    // Update support case in file
    const supportCasesFile = path.join(__dirname, 'support_cases.json');
    if (fs.existsSync(supportCasesFile)) {
      const data = fs.readFileSync(supportCasesFile, 'utf8');
      try {
        const cases = JSON.parse(data);
        const updatedCases = cases.map(caseItem => {
          if (caseItem.id === id) {
            return { ...caseItem, status: 'closed', closedAt: new Date().toISOString() };
          }
          return caseItem;
        });
        
        fs.writeFileSync(supportCasesFile, JSON.stringify(updatedCases, null, 2), 'utf8');
      } catch (error) {
        console.error('Error updating support cases file:', error);
      }
    }
    
    res.json({ success: true, message: 'Support case closed successfully' });
  } catch (error) {
    console.error('Error closing support case:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to close support case', 
      details: error.response?.data || error.message 
    });
  }
});

// Helper functions
function generateRandomString(length) {
  if (length < 1) return '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  // Make sure we start with a lowercase letter (as in the original code)
  const firstChar = 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * 26));
  let result = firstChar;
  for (let i = 1; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function getCountryName(countryCode) {
  const countries = {
    'DE': 'Germany',
    'GB': 'United Kingdom',
    'US': 'United States',
    'ES': 'Spain',
    'FR': 'France',
    'IT': 'Italy',
    'NL': 'Netherlands',
    'BR': 'Brazil',
    'CA': 'Canada',
    'MX': 'Mexico',
    'AR': 'Argentina',
    'AU': 'Australia',
    'AT': 'Austria',
    'BE': 'Belgium',
    'CO': 'Colombia',
    'HK': 'Hong Kong',
    'SG': 'Singapore',
    'CN': 'China',
    'CH': 'Switzerland',
    // New countries (WIP)
    'JP': 'Japan (WIP)',
    'KR': 'South Korea (WIP)',
    'RU': 'Russia (WIP)',
    'ZA': 'South Africa (WIP)',
    'IN': 'India (WIP)',
    'PL': 'Poland (WIP)',
    'SE': 'Sweden (WIP)',
    'NO': 'Norway (WIP)',
    'DK': 'Denmark (WIP)',
    'FI': 'Finland (WIP)',
    'PT': 'Portugal (WIP)',
    'GR': 'Greece (WIP)',
    'TR': 'Turkey (WIP)',
    'IE': 'Ireland (WIP)',
    'NZ': 'New Zealand (WIP)',
    'CL': 'Chile (WIP)',
    'PE': 'Peru (WIP)',
    'UA': 'Ukraine (WIP)',
    'TH': 'Thailand (WIP)',
    'VN': 'Vietnam (WIP)'
  };
  
  return countries[countryCode] || countryCode;
}

// SPA Route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`ProxyNameClaimer Server started on http://localhost:${PORT}`);
  console.log(`Open this URL in your browser to use the application.`);
});
