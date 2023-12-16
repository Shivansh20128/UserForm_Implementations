const express = require('express');
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const port = 3000;

function isValidowner_Email(owner_email) {
    // Regular expression for a basic owner_email validation
    const owner_emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  
    // Test the owner_email against the regex
    return owner_emailRegex.test(owner_email);
  }

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submissions
app.post('/submit', (req, res) => {
  const { form_name, owner_email, no_of_questions } = req.body;

  if(!form_name.trim()){
    return res.redirect('/?error=1');
  }

  if(!owner_email.trim() && isValidowner_Email(owner_email)){
    return res.redirect('/?error=1');
  }
  
  if(no_of_questions<0 && no_of_questions>20){
    return res.redirect('/?error=1');
  }
  
  // CSV file path
  const csvFilePath = 'data.csv';

  // Create or append to the CSV file
  const csvWriter = createCsvWriter({
    path: csvFilePath,
    header: [
      { id: 'form_name', title: 'formName' },
      { id: 'owner_email', title: 'ownerEmail' },
      { id: 'no_of_questions', title: 'noOfQuestions' },
    ],
    append: true,
  });

  // Write data to the CSV file
  csvWriter.writeRecords([{ form_name, owner_email, no_of_questions }])
    .then(() => {
      console.log('Data written to CSV file');
      // Redirect back to the form
      res.redirect('make_form.html');
    })
    .catch(error => console.error(error));
});
    app.get('/questions-form', (req, res) => {
        // Render the form for collecting questions and input types
        res.sendFile(__dirname + '/questions-form.html');
    });

    app.get('/get-num-questions', (req, res) => {
        const csvFilePath = 'data.csv';
        const csvReader = require('csv-parser');
        const fs = require('fs');
      
        const results = [];
        fs.createReadStream(csvFilePath)
          .pipe(csvReader())
          .on('data', data => results.push(data))
          .on('end', () => {
            if (results.length > 0) {
              const numQuestions = results[results.length-1].numQuestions;
            //   console.log(results.length);
              res.json({ numQuestions });
            } else {
              res.status(404).json({ error: 'Form information not found.' });
            }
          });
      });
      
      app.post('/submit-questions', (req, res) => {
        const numQuestions = Object.keys(req.body).length/2;
        console.log(numQuestions);
        const csvFilePath = 'questions.csv';
        const csvWriter = createCsvWriter({
          path: csvFilePath,
          header: [
            { id: 'question', title: 'question' },
            { id: 'inputType', title: 'input_type' },
          ],
          append: false,
        });
        const records = [];
        // Loop through the submitted questions and input types
        for (let i = 1; i <= numQuestions; i++) {
            console.log(req.body[`question${i}`]);
            console.log(req.body[`inputType${i}`]);
          const question = req.body[`question${i}`];
          const inputType = req.body[`inputType${i}`];
          records.push({ question, inputType });
        }
        //   console.log(req.body);
        csvWriter.writeRecords(records)
        .then(() => {
          console.log('Questions and input types written to questions.csv');
          res.redirect('/generated-form');
        })
        .catch(error => {
          console.error(error);
          res.redirect('/?error=2');
        });
        
      });

    app.get('/generated-form', (req, res) => {
    const csvFilePath = 'questions.csv';
    
    console.log("this is generated");
    const questions = [];
    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', data =>{
            // console.log(data);
            questions.push(data);
            console.log(questions);
        })
        .on('end', () => {
        const formHtml = generateFormHtml(questions);
        // console.log(formHtml)
        res.send(formHtml);
        });
        // console.log(fs.createReadStream(csvFilePath).pipe(csv()).on('data') );
    });
    
    // const createCsvWriter = require('csv-writer').createObjectCsvWriter;

    app.post('/submit-generated-form', (req, res) => {
        const createCsvWriter = require('csv-writer').createObjectCsvWriter;
        const responses = Object.values(req.body);

    // Write the responses to a CSV file
    const questionsFilePath = 'questions.csv';
    const questions = [];
    
    fs.createReadStream(questionsFilePath)
        .pipe(csv())
        .on('data', data => questions.push(data))
        .on('end', () => {

            const csvWriter = createCsvWriter({
                path: 'responses.csv',
                header: questions.map(question => ({ id: question.question, title: question.question })),
                append:true,
            });

            const data = {};
            responses.forEach((response, index) => {
                data[questions[index].question] = response;
            });

            csvWriter.writeRecords([data])
                .then(() => {
                    console.log('Responses written to CSV file with questions as column titles');
                })
                .catch(error => {
                    console.error('Error writing to CSV file:', error);
                });

            // Redirect to the home page or another appropriate page
            res.redirect('/generated-form');
        });
});
    
    
    function generateFormHtml(questions) {
    let formHtml = '<!DOCTYPE html>';
    formHtml += '<html lang="en">';
    formHtml += '<head>';
    formHtml += '<meta charset="UTF-8">';
    formHtml += '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    formHtml += '<title>Generated Form</title>';
    formHtml += '<style>';
    formHtml += 'body {';
    formHtml += '    font-family: Arial, sans-serif;';
    formHtml += '    background-color: #f4f4f4;';
    formHtml += '    margin: 0;';
    formHtml += '    padding: 0;';
    formHtml += '}';
    formHtml += 'h2 {';
    formHtml += '    margin-left: 45%;';
    formHtml += '    color: #333;';
    formHtml += '}';
    formHtml += 'form {';
    formHtml += '    max-width: 70%;';
    formHtml += '    margin: 20px auto;';
    formHtml += '    padding: 20px;';
    formHtml += '    background-color: #fff;';
    formHtml += '    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);';
    formHtml += '}';
    formHtml += 'label {';
    formHtml += '    display: block;';
    formHtml += '    margin-bottom: 8px;';
    formHtml += '    color: #001658;';
    formHtml += '}';
    formHtml += 'input[type="text"] {';
    formHtml += '    width: 100%;';
    formHtml += '    padding: 8px;';
    formHtml += '    margin-bottom: 16px;';
    formHtml += '    box-sizing: border-box;';
    formHtml += '}';
    formHtml += 'input[type="submit"] {';
    formHtml += '    background-color: #4caf50;';
    formHtml += '    color: #fff;';
    formHtml += '    padding: 10px;';
    formHtml += '    border: none;';
    formHtml += '    cursor: pointer;';
    formHtml += '}';
    formHtml += 'input[type="submit"]:hover {';
    formHtml += '    background-color: #45a049;';
    formHtml += '}';
    formHtml += '</style>';
    formHtml += '</head>';
    formHtml += '<body>';
    formHtml += '<h2>Generated Form</h2>';
    formHtml += `<form action="/submit-generated-form" method="post">`;
    
    questions.forEach((question, index) => {
        console.log(question.question);
        console.log(index);
        formHtml += `<label>${question.question}:</label>`;
    
        if (question.inputType === 'text' || question.inputType === 'int' || question.inputType === 'email') {
        formHtml += `<input type="${question.inputType}" name="generatedInput${index}" placeholder="Write your response" required>`;
        } else {
        // Default to text input if the input type is not recognized
        formHtml += `<input type="text" name="generatedInput${index}" placeholder = "Write your response" required>`;
        }
    
        formHtml += '<br>';
    });
    
    formHtml += `<input type="submit" value="Submit">`;
    formHtml += `</form>`;
    formHtml += `</body>`;
    formHtml += `</html>`;
    
    return formHtml;
    }

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
