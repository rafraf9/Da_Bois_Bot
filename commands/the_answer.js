module.exports = {
    name: "the_answer",
    description: "returns the answer to life the universe and everything",
    execute(message, args){
        message.channel.send('The answer to life, the universe and every thing is 42');
    }
}