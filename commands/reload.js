const { exec } = require("child_process");

module.exports = {
    name: "reload",
    description: "reloads the bot",
    roles: ['SuperAdmin', 'Admin'],
    execute(message, args){
        message.channel.send("Reloading the bot...");

        exec("git fetch", (error, stdout, stderr)=>{
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    }
}