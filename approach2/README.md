# Atlan Task
Backend Challenge for internship at Atlan


This repository contains the code for making a form. For my case, I have added a form for a governments delivering vaccines to small business owners managing their daily inventory.
The form contains a set of questions the answers to whom can be text, numbers, email IDs or optional questions.

The entire code base is provided and the steps to establish the setup are also provided below.
The fetures that are implemented in this task from the problem statement are:

1. The form responses are stored in a google sheet having link - https://docs.google.com/spreadsheets/d/1DyrT2SekXp19FbdZHEEOtm-wMjiqR3vD40Hi8-ndCvg/edit?usp=sharing

2. For every form response, a well set of of rules have been defined to perform validation checks on them. This will ensure that only valid data is entered into our data store.


# Setup

Follow the below steps to make the setup.

Clone this repository (It is a private repo, so I will need to add you as collaborator first)
```
git clone https://github.com/Shivansh20128/Atlan_task.git
```

Install the necessary packages
```
npm install express body-parser fs
```

Now, run your Node.js server
```
node server.js
```

A localhost server will start running on port 3000. 

Go to http://localhost:3000 and fill the form as you like.

You can then check the response you filled on the provided Google sheet link.