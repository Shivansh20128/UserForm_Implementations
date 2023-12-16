# Atlan Task

In this assignment, we are asked to design a sample schematic on how we can store forms and responses in a data store. 

For this purpose, I have made two projects to fulfill this purpose, both having different approaches.

I am going to talk about both the appraches here. The first approach allows the user to create forms, and store data locally in the form of .csv files. In this approach, the user can add as many number of questions in the form as he/she wants. The responses can be of any type (although I have supported for just 3 types - text, number and emails). The form can be given a name (and some other information covering the metadata for the form section). 
All the information is stored about the forms, the questions, and the responses in the csv files. Support for adding this data to google sheets can be added to this as a further development (has been covered in the other approach). 

In the other approach, I have prepared a form for a government body providing vaccines to enterprises. In this approach, The form takes the responses and sends them directly to a google sheet without any delay.


# Design

There are many ways to design such a data store for forms. The most commonly known are the Google forms, from which we can learn a lot and try to replicate how it functions. 

We are going to discuss about a real-world scenerio now.

1. The application can be hosted on a web server, on any cloud platform like AWS, Azure or GCP. Since AWS is the most commonly used cloud platform, we can use Amazon Elastic Compute Cloud (EC2) instance to host the application. It has many features that can linked to it like S3 for storage, and features like load balancers, fault tolenrance by deploying multiple instances, monitoring services, auto scaling, log generation, rate controlling, etc. All these features can be added in simple steps. 
1. Since we are supposed to use google sheets, it would be better to use GCP (Google cloud platform). GCP has Google Compute Engine, which is an equivalent of EC2 in AWS. However, this requires a lot of configuration to be done first. Other alternatives are using web hosting in GCP.
1. Support for google sheets can be added using the APIs provided by google sheets extensions, or internally by going to the google cloud console, and enabling an API for google sheet, and then configuring the google cloud service inside our application code. This configuration includes steps like  authentication and authorization to the application to write in the google sheet. 
1. GCP provides monitoring, logging, and alerts services. These can be used to monitor our application about its usage and the system can then be configured accordingly. For example, if we see that the general traffic on our application crosses the peak capacity everyday, then we should increase the capacity of our engine. 
1. The logs generated help us know what component needs an upgrade or modifications.
1. To make the application failsafe, autoscaling can be enabled, which can scale our resources both horizontally and vertically as per need. To keep the data safe, multiple instances should be deployed so that if one of the instances fails, the others keep working and their is no performance degradation and loss.
1. In case of a power-outage, the multiple running instances will ensure that our application keeps running, and the response a particular user has filled reaches the data store and is stored. 
1. Coming to the datastore, using google sheets is easy and efficient for most of the cases. But for extremely high loads, google sheets causes problems. For example, google sheets can add 40,000 rows at a time. Although 40,000 is high enough to satisfy most of the applications, but for a very high load application, this may not be enough. For those cases, we may need some other data store.
1. The capacity of google sheets is about 10 million cells. This also may not be enough if we have a dataset for global population or vaccine distribution to all the enterprises.

 
# Deliverables Delivered

1. In my applications, I have used google sheets as instructed to store the data from the forms. This has been done using the google sheets API.
2. I have implemented the form validation checks. This will validate the responses coming from the user side, and will not let any invalid data to be written to teh data store.
3. The forms have their meta data in the form of form name, form's owner's email id, number of questrions in the form. Other metadata like data and time of creation, description if the form can be similarly added.
4. Although it is not asked, but I have added some designing to the forms so that it looks pleasant. This has been done using CSS.
 

# Pro/Con Analysis

While working on this assignment, I thought about various approaches that it could be done. But due to the lack of access to cloud platforms, I could do only a minimal version of it by hosting it on my localhost. And due to that, I could not add any monitoring, auto-scaling, fault tolerance kind of features to it.

The node.js server enables us to store the data from the forms to be stored in the backend datastore. I have implemented both the approaches here, one in which data is being stored in the backend csv files and then can be later transferred to the online cloud storage like google sheets, and another approach, in which the data is being stored directly to the google sheets. If we add features like fault tolerance to these, these would not fail our application.