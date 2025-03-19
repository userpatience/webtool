# WEBTOOL

## Installation & Start

1. Make sure [Node.js](https://nodejs.org/) is installed on your computer.
2. Navigate to the directory where you saved the files using the command line.
3. Run the following command to install the required dependencies:
   ```
   npm install
   ```
4. Start the application:
   ```
   npm start
   ```
5. Open the following address in your browser:
   ```
   http://localhost:3000
   ```
## Directory Structure

```
proxy-name-claimer/
├── server.js                
├── package.json             
├── accounts.json            
└── public/                  
    ├── index.html           
    └── script.js           
```

## Functionality

### 1. Create Account
- Input mail (e.g. xyz@knobhead.xyz)
- Choose a country
- Creates "guest-xyz" account and saves it to ```accounts.json``` or accounts tab

### 2. IP-Location
- Shows Ubi IP-Data, may differ from actual or proxy location

### 3. Availasble Countries (WIP)
- Shows all available countries, WIP are not tested

### 4. Manage Accounts
- Shows all created accounts
- ability to delete select accounts

## Error Handling
If any issues occur:
1. Check if all required files are present.
2. Ensure all dependencies are installed.
3. Verify if port 3000 is available (if not, change the port in server.js).
4. Check the server console output for error messages.

## Notes

- All created accounts are stored locally in the ```accounts.json``` file.
- The default password for all accounts is *"SiegeHere*".

