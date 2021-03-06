// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values.
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix

//нулевая переменная
var index;


//время
var curtime;

// идентификатор внутреннего таймера
// можем использовать для остановки ранее запущенного периодического исполнения
var timerId;



var banka = [
  ['UserObj', 'banTill']
];


client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`[Discord Bot] Генно модифицированный помидор запустился, с ${client.users.size} users, в ${client.channels.size} channels в ${client.guilds.size} guilds.`);
  client.users.get("257562484360085504").send(`[Discord Bot] Генно модифицированный помидор запустился, с ${client.users.size} users, в ${client.channels.size} channels в ${client.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setGame(`игру`);

  //точное время
  curtime = setInterval(function() {
    curdate = new Date();
  }, 1000);

//кол-во забаненых человек
if (banka.length === 1) {
  countbannedusers = 0;
} else {
  countbannedusers = banka.length - 1;
}

  // включим обработчик раз в 5 сек

  timerId = setInterval(function() {
    var curtimen = curdate.getTime();
    //    console.log("тик");
    //    client.users.get("257562484360085504").send("Tick!");
    if (banka.length > 1) {
      console.log(`Начинаю перебор массива. Длинна массива: ${banka.length}`);
      for (index = 0; index < banka.length; ++index) {
		  if (Math.round((banka[index][1] - curtimen) / 60000) > 0) {
          console.log(`Осталось времени в бане: ${Math.round((banka[index][1] - curtimen)/60000)} мин`);
        }
        if (banka[index][1] < curtimen) {
          var member = banka[index][0];
          member.removeRole("350340218148093953");
          banka.splice(index, 1);
          client.channels.get("350340557840580619").send(`<@${member.user.id}> ты свободен!`);
          console.log(`[Discord Bot] <@${member.user.id}> разбанен.`);
          client.users.get("257562484360085504").send(`[Discord Bot] <@${member.user.id}> разбанен.`);
          var member = 0;
        }


        if (banka.length === 1) {
          countbannedusers = 0;
        } else {
          countbannedusers = banka.length - 1;
        }
      }
    }
  }, 30000);

});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`[Discord Bot] New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`игру`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`[Discord Bot] I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`игру`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if (message.content.indexOf(config.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Let's go with a few common example commands! Feel free to delete or change those.
  if (command === "banned") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    if (countbannedusers > 0) {
      message.channel.send(`[Discord Bot] Колличество забаненых игроков ${countbannedusers}.`);
      for (index = 0; index < banka.length; ++index) {
        var curtimen = curdate.getTime();
        var member = banka[index][0];
        if (Math.round((banka[index][1] - curtimen) / 60000) > 0) {
          message.channel.send(`<@${member.user.id}> осталось времени в бане: ${Math.round((banka[index][1] - curtimen)/60000)} мин`);
        }
      }
    } else {
      message.channel.send(`[Discord Bot] Колличество забаненых игроков 0.`);
    }
  }

  if (command === "пинг") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Понг! Задержка: ${m.createdTimestamp - message.createdTimestamp}мс. Задержка API: ${Math.round(client.ping)}мс.`);
    console.log(`[Discord Bot] Ping send to ${message.author.tag} in ${message.channel}.`);
    client.users.get("257562484360085504").send(`[Discord Bot] Ping send to ${message.author.tag} in ${message.channel}.`);
  }

  if (command === "s") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o => {});
    // And we get the bot to say the thing:
    message.channel.send(sayMessage);
    console.log(`[Discord Bot] Said the words "${args.join(" ")}" by ${message.author.tag} in ${message.channel}.`);
    client.users.get("257562484360085504").send(`[Discord Bot] Said the words "${args.join(" ")}" by ${message.author.tag} in ${message.channel}.`);
  }

  if (command === "game") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
    const game = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o => {});
    // And we get the bot to say the thing:
    client.user.setGame(`${game}`);
    console.log(`[Discord Bot] ${message.author.tag} change game to "${game}" in ${message.channel}.`);
    client.users.get("257562484360085504").send(`[Discord Bot] ${message.author.tag} change game to "${game}" in ${message.channel}.`);
  }

  if (command === "status") {
    const status = args.join(" ");
    message.delete().catch(O_o => {});
    if (status === "1") {
      client.user.setStatus(`online`);
      console.log(`[Discord Bot] ${message.author.tag} change status to online in ${message.channel}.`);
      client.users.get("257562484360085504").send(`[Discord Bot] ${message.author.tag} change status to online in ${message.channel}.`);
    } else if (status === "2") {
      client.user.setStatus(`idle`);
      console.log(`[Discord Bot] ${message.author.tag} change status to idle.`);
      client.users.get("257562484360085504").send(`[Discord Bot] ${message.author.tag} change status to idle in ${message.channel}.`);
    } else if (status === "3") {
      client.user.setStatus(`dnd`);
      console.log(`[Discord Bot] ${message.author.tag} change status to dnd.`);
      client.users.get("257562484360085504").send(`[Discord Bot] ${message.author.tag} change status to dnd in ${message.channel}.`);
    } else if (status === "4") {
      client.user.setStatus(`invisible`);
      console.log(`[Discord Bot] ${message.author.tag} change status to invisible.`);
      client.users.get("257562484360085504").send(`[Discord Bot] ${message.author.tag} change status to invisible in ${message.channel}.`);
    } else {
      message.channel.send(`Чет дис лагает...`);
      console.log(`[Discord Bot] ${message.author.tag} could not change status.`);
      client.users.get("257562484360085504").send(`[Discord Bot] ${message.author.tag} could not change status in ${message.channel}.`);
    }
  }

  if (command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit:
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if (!message.member.roles.some(r => ["Administrator", "Moderator"].includes(r.name)))
      return message.reply("Sorry, you don't have permissions to use this!");

    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    let member = message.mentions.members.first();
    if (!member)
      return message.reply("Please mention a valid member of this server");
    if (!member.kickable)
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    // slice(1) removes the first part, which here should be the user mention!
    let reason = args.slice(1).join(' ');
    if (!reason)
      return message.reply("Please indicate a reason for the kick!");

    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }

  if (command === "ban") {
    message.delete().catch(O_o => {});
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if (!message.member.roles.some(r => ["Герцог", "Милорд"].includes(r.name)))
      return message.reply("Я вам не доверяю сэр!");

    let member = message.mentions.members.first();
    if (!member)
      return message.reply("Тут такого нету!");
    if (!member.bannable)
      return message.reply("Вы ошибаетесь! Этот покемон полностью здоров!");

    let reason = args.slice(1).join(' ');
    if (!reason)
      return message.reply("Укажите примерный диагноз");

    await member.addRole("350340218148093953", reason)
      .catch(error => message.reply(`Черт, ${message.author} я не могу узнатьего диагноз по причине: ${error}`));
    message.channel.send(`<@${member.user.id}> помещен в карантин, диагноз: ${reason}`);
    client.users.get("257562484360085504").send(`[Discord Bot] ${message.author} забанил <@${member.user.id}>.`);
    var bantotime = curdate.getTime() + 5400000 ;
    u_data = [member, bantotime];
    banka.push(u_data);
    console.log(`[Discord Bot] ${message.author} забанил <@${member.user.id}>.`);

  }

  if (command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.

    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);

    // Ooooh nice, combined conditions. <3
    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({
      count: deleteCount
    });
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});

client.login(config.token);
