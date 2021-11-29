<!-- Banner Image -->

<p align="center">
  <a href="https://expo.dev/">
    <img alt="expo sdk" height="128" src="./.github/resources/banner.png">
    <h1 align="center">Expo</h1>
  </a>
</p>

<p align="center">
   <a aria-label="SDK version" href="https://www.npmjs.com/package/expo" target="_blank">
    <img alt="Expo SDK version" src="https://img.shields.io/npm/v/expo.svg?style=flat-square&label=SDK&labelColor=000000&color=4630EB" />
  </a>
  <a aria-label="Join our forums" href="https://forums.expo.dev" target="_blank">
    <img alt="Forums" src="https://img.shields.io/badge/Ask%20Questions%20-blue.svg?style=flat-square&logo=discourse&logoWidth=15&labelColor=000000&color=4630EB" />
  </a>
  <a aria-label="Join our Discord" href="https://discord.gg/4gtbPAdpaE" target="_blank">
    <img alt="Discord" src="https://img.shields.io/discord/695411232856997968.svg?style=flat-square&labelColor=000000&color=4630EB&logo=discord&logoColor=FFFFFF&label=" />
  </a>
  <a aria-label="Expo is free to use" href="https://github.com/expo/expo/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-success.svg?style=flat-square&color=33CC12" target="_blank" />
  </a>
  <a aria-label="expo downloads" href="http://www.npmtrends.com/expo" target="_blank">
    <img alt="Downloads" src="https://img.shields.io/npm/dm/expo.svg?style=flat-square&labelColor=gray&color=33CC12&label=Downloads" />
  </a>
</p>

<p align="center">
  <a aria-label="try expo with snack" href="https://snack.expo.dev"><b>Try Expo in the Browser</b></a>
 |
  <a aria-label="expo documentation" href="https://docs.expo.dev">Read the Documentation 📚</a>
</p>

<p>
  <a aria-label="Follow @expo on Twitter" href="https://twitter.com/intent/follow?screen_name=expo" target="_blank">
    <img  alt="Twitter: expo" src="https://img.shields.io/twitter/follow/expo.svg?style=flat-square&label=Follow%20%40expo&logo=TWITTER&logoColor=FFFFFF&labelColor=00aced&logoWidth=15&color=lightgray" target="_blank" />
  </a>
  <a aria-label="Follow Expo on Medium" href="https://blog.expo.dev">
    <img align="right" alt="Medium: exposition" src="https://img.shields.io/badge/Learn%20more%20on%20our%20blog-lightgray.svg?style=flat-square" target="_blank" />
  </a>
</p>
  
---

## 🗺 REQUIREMENTS NEEDED TO RUN THE PROJECT ON YOUR WINDOWS COMPUTER

- Make sure you have expo cli installed globally on your computer.
- Make sure you have node installed on your computer.
- Make sure you have composer installed on your computer.
- I recommend that you use VSCode as your IDE

## 🗺 STEPS TO FOLLOW ON HOW TO RUN YOUR PROJECT ON YOUR LOCAL SERVER

- clone the project from this github repository or download the zip folder to your computer.
- open the project folder with your ide and open the terminal on your ide, altrnatively you can use your computer command prompt and direct to the project folder
- on your terminal, run 'npm install' to install the required node modules.
- now run 'npm start' to start the react project
- create a database in your server interface admin and name it 'todo'
- now change directory to api folder
- run 'composer install' to install the required modules
- rename the .env.example file to .env
- now add your database, username and password in the correct specified fields in the .env file
- in our case we will be using posgresql so add your pqsql to your database name, postgres as your username and the password that you have choosen
- on your terminal run 'php artisan key:generate'.
- migrate your tables by running 'php artisan migrate'.
- now start the project by running 'php artisan serve'.
- Your project should be up and running now