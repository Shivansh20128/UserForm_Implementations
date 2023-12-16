# Atlan Task

In this assignment, we are asked to design a sample schematic on how we can store forms and responses in a data store. 

For this purpose, I have made two projects to fulfill this purpose, both having different approaches.

I am going to talk about both the appraches here. The first approach allows the user to create forms, and store data locally in the form of .csv files. In this approach, the user can add as many number of questions in the form as he/she wants. The responses can be of any type (although I have supported for just 3 types - text, number and emails). The form can be given a name (and some other information covering the metadata for the form section). 
All the information is stored about the forms, the questions, and the responses in the csv files. Support for adding this data to google sheets can be added to this as a further development (has been covered in the other approach). 

In the other approach, I have prepared a form for a government body providing vaccines to enterprises. In this approach, The form takes the responses and sends them directly to a google sheet without any delay.

Here, we will talk in detail about approach 1. Approach 2 is discussed in detail in the approach2 folder.

# Approach 1

First clone (or extract the zip folder).

After entering in the folder apprach 1, you will see the html and javascript files. The project uses node js. 
Enter the command:
```
npm install express csv-writer
```

Some other node.js dependencies may also be required as per your systems. Kindly install them too.

