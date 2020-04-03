# MicroApp

You will find below the Hackathon template to create a microapp.

**What's a microapp?**

Microapps are single purpose and cross-platform apps designed to support a single step in a user’s workflow.

In contrast to full-blown mobile apps, microapps are lightweight apps within a container that perform
one single task — and do so seamlessly, with little friction.

Microapps are self-sufficient and can be independently deployed and tested. They can be deployed dynamically without going through an
App Store approval process and downloading/updating apps. Access restrictions are applied to restrict who can access what microapps, 
and what information from the main App users is delivered.

**Please find our microapp Documentation below:**
*   https://gitlab.com/ayoba_hackathon/microapp/-/wikis/home

# Start your Microapp now!

As a developer you only need few steps to start your own Microapp:

1. Fork this Microapp Template project ([more info here](https://docs.gitlab.com/ee/user/project/repository/forking_workflow.html#creating-a-fork))
2. Choose and change your repo name and logo ([more info here](https://docs.gitlab.com/ee/user/project/settings/))
3. ... and you're done!

# Development

## Single Page Application (SPA)
A single-page application (SPA) is a web application or website that interacts 
with the web browser by dynamically rewriting the current web page with new data
from the web server, instead of the default method of the browser loading entire
new pages. The goal is faster transitions that make the website feel more like a
native app.

Ayoba Microapps are based on this concept and helps to external developers to
increase the functionalities of Ayoba.

## Ayoba integration

Ayoba provides a list of operations that can be used by external developers to retrieve some user allowed information.

Examples:
```
// send plain text
Ayoba.sendMessage("Hello Ayoba!")

// send multimedia files
Ayoba.sendMedia(`https://media.giphy.com/media/NmerZ36iBkmKk/200w_d.gif`, `image/gif`)

// read user info
var userCountry = Ayoba.getCountry()

// ... check other samples in this repository 
```

Check out the [wiki](https://gitlab.com/ayoba_hackathon/microapp/-/wikis/home) to see all the available operations 

## Extra info
Please read these documents to develop a good SPA

*  https://en.wikipedia.org/wiki/Single-page_application
*  https://developer.android.com/guide/webapps/best-practices

## Contribute Microapp library
Pull requests are encouraged and always welcome. Pick an issue and help us out!

To work on this project: 

```
git clone https://gitlab.com/ayoba_hackathon/microapp.git
````

# End-to-End test
You can test your microapp only after beeing published. Please visit the request form to prepare you microapp publication:

1. Request for a Microapp slot into Ayoba
2. Provide the detailed info of your app
3. All the user info your app needs can be requested by a permission system while the user installs the app. Please make sure the permissions list is well requested
4. Deploy you microapp code in a public site



## How-to use the GitLab Pages CI to publish the microapp files
Using GitLab Pages, your microapp can be deployed and public visible to internet. E.g.

```
https://ayoba_hackathon.gitlab.io/microapp/ayoba-sample

````

This will allow you as a developer to publish your microapp without running a complete webserver. 

Follow the next steps to publish a microapp through this repo template:

1. Develop you microapp
2. Config your .gitlab-ci.yml
```
# This file is a template, and might need editing before it works on your project.
# Full project: https://gitlab.com/pages/plain-html
pages:
  stage: deploy
  script:
    - mkdir .public
    - cp -r * .public
    - mv .public public
  artifacts:
    paths:
      - public
  only:
    # choose your preferred source branch
    - develop 
```
3. Commit your changes into your choosed source branch (e.g. master)
4. Confirm after the code integration to your choosed source branch, the pipeline runs and deploys your microapp

Check https://docs.gitlab.com/ee/user/project/pages/ for more info. 
