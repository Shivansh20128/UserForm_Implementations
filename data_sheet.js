const fs = require('fs');
const { google } = require('googleapis');

// Load client secrets from a file
const credentials = JSON.parse(fs.readFileSync('client_secret_106039308192-67dc94m1h82ffa7hccpshuh0e1kicjkn.apps.googleusercontent.com.json'));

// The ID of the spreadsheet where you want to write data
const spreadsheetId = '16uba5oTqd7GbiScQGG8FQ5yamHYY4RO3_0Reqwnfdqg';

// The range in the spreadsheet where you want to write data (e.g., 'Sheet1'!A1)
const range = 'Sheet1!A1';

// Read data from CSV file
const csvFilePath = 'responses.csv';
const csvData = fs.readFileSync(csvFilePath, 'utf8');

// Convert CSV data to 2D array
const dataArray = csvData.split('\n').map(row => row.split(','));

// Authenticate with Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Create Google Sheets API client
const sheets = google.sheets({ version: 'v4', auth });

// Prepare request body
const requestBody = {
  spreadsheetId,
  range,
  valueInputOption: 'RAW',
  resource: { values: dataArray },
};

// Update Google Sheet
sheets.spreadsheets.values.update(requestBody, (err, res) => {
  if (err) {
    console.error('Error updating data:', err.message);
    return;
  }
  console.log('Data updated successfully!');
});
