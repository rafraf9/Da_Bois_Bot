# Da_Bois_Bot
Finnaly has realtime deployment

## Instructions to create your own instance of the bot:
 **1)** Download or clone the code from the repo. \
 **2)** Go into the directory where the code is cloned.\
 **3)** Create a new file called `bot-info.json`.\
 **4)** Write to the file in this format:
 ```
    {
    "prefix": "Insert_your_command_prefix(Usually !)",
    "token": "Insert_your_secret_bot_token",
    "mode": "release"
    }
```
**5)** Run the following commands: 
```
npm install
npm install discord.js
node bot.js
```

If any issues come up write them in the issues page
