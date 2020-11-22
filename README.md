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

## Creating your own commands:
Da Bois Bot currenly only allows commands triggered by commands phrases, but hopefully more will come :)

#### Adding a new Triggered Command:

**1)** Add a new file in the commands folder called `your_command_name.js`\
**2)** To export your your command write in the following format:
```
module.exports = {
 name: "name_of_your_command",
 description: "what does the command do?",
 roles: [role1, role2, role3](Optional),
 excecute(message, args){
  function_that_excecutes_the_command
 }
};
```
**3)** if the bot is already running run the reload_all command to load new commands.
