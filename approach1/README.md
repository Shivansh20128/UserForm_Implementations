
Here, we will talk in detail about approach 1. Approach 2 is discussed in detail in the approach2 folder.

# Approach 1

First clone (or extract the zip folder).

After entering in the folder apprach 1, you will see the html and javascript files. The project uses node js. 
Enter the command:
```
npm install express csv-writer
```

Some other node.js dependencies may also be required as per your systems. Kindly install them too.

Now we can run the application using the command:
```
node app.js
```
When we run the application, we will get a localhost server hosted on port 3000. Now open ```http://localhost:3000/``` in a browser.

You will be able to see a form, asking you to fill the details of the form. this will be the metadata about the form. Other metadata that can be added about the form being created are date and time of creation, creater's reason, a small description about the form, etc. Fill out the form and submit it.

Now, you will be taken to another page. This page will have a new form with the same number of questions as you specified in the previous page (should be less than 21) (Validation of the form has been performed at the backend). You can fill this form and the data types each of the questions expects. For this case, support has been added only for text, number and email, although the program will not stop if you enter some other data type.

After filling all the questions and their data types, you will be navigated to the form that will be send to the users in a real environment. In a real environment, the form will be published on a unique link, but since this is just a sample on a localhost, I have given it a static URL. 
On this page, the form can be filled and submitted. Upon submission, the page will be just refreshed and not navigate to any other page so that you can try it multiple times without going through the whole process again.

# Deliverables Required

1. The assignment asks for validation checks, which have been performed for the data types, i.e., the data types should be from int, number and email. However, the program will not end if some other input type is provided. Other validation check is of the limit for the number of questions, it should more than 0 and less than 21. 
1. The assignment asks for logging. This has been done while writing the code. try-catch statements have been written everywhere where there is some chance of getting an error. The errors have been printed through the console using console.log statements.
