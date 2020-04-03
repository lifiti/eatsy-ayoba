# Eatsy Ayoba MicroApp

A food ordering platform for local restuarants via the Ayoba chat app.

**Deployed url:**
*   https://eatsy-ayoba-app.herokuapp.com/

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