# The Perfect Lil' Bot

This bot example is the combined work of members of the Discord.js and Idiot Guide's community.
It attempts to provide a "complete" starter example of a simple, one-file bot, with comments and
information to properly understand each part and how it works.

> I believe I should note that I'm a #speedwhore and the lines used in this example are *the fastest*
in terms of performance, especially using Node 8. Though maybe "indexOf" might look ugly for example, 
it is faster than startsWith *by an order of magnitude*. I have the performance tests to prove it.

There is also an upcoming example of a more complete bot with separate command files (command handler)
as well as per-server configurations. You can find it at: [to be done!]

If what you need is a selfbot, this won't do. I suggest taking a look at [evie.selfbot](http://github.com/eslachance/evie.selfbot)

## Setup

- Create a new folder somewhere, give it a bot name, aka `MyBot` or `SuperBot`
- Create a file called `app.js`, and paste in the contents of app.js below.
- Create a file called `config.json` and give it the following content, using your real bot token:
```json
{ "token"  : "MTg-this-IzNzU3OTA5NjA-is.not-DCeFB-a.real-r4DQlO-t0ken-qerT0",
  "prefix" : "+"
}
```

You then need to run a couple of things to make this work. Those things are run in console, which
can be opened by using `SHIFT+Right-Click` in your folder, and selected `Open command prompt here`
(your version of windows might say "PowerShell", don't worry it'll work fine!). In console, use
the following commands:

```
npm install discord.js
node app.js
```

If you've done things right, that should start the bot. 


## Credits

Project created and maintained with the help of: 

- **eslachance#4611** , aka `〈evie.codes〉`, for the heavy lifting
- **York#2400** , for pointing out mistakes, moral support and jester entertainment.
- **TrueBoxGuy#3692** for letting me know of a dumb thing I forgot, and an unfinished comment.