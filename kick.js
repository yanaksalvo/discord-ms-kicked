const { Client, Intents, WebhookClient } = require('discord.js');
const configData = require('./config.json');

const token = configData.token;
const webhookURL = configData.webhook_url; 
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity('1943&SALVO', { type: 'WATCHİNG' });
  client.user.setStatus('idle');
});

client.on('guildMemberAdd', async (member) => {
  const memberName = member.user.username.toLowerCase();

  await kickMember(member, webhookURL);
});

client.login(token);

async function kickMember(member, webhookURL) {
  try {
    const startTime = Date.now();
    await member.kick({ reason: '@wdyfxm' });
    const endTime = Date.now();
    const elapsedTimeMs = endTime - startTime;

    const vanityUrl = member.guild.vanityURLCode || 'no bio yet';

    const logMessage = `Kicked: <@${member.user.id}> [${member.user.tag}] - ms 0.${elapsedTimeMs} - Url: [${vanityUrl}]`;
    console.log(logMessage);

    const webhook = new WebhookClient({ url: webhookURL });
    const logMessageWebhook = `Kicked: <@${member.user.id}> [${member.user.tag}] - ms 0.${elapsedTimeMs} - Url: ${vanityUrl}`;

    await webhook.send(logMessageWebhook);
  } catch (error) {
    console.error('Error kicking member:', error);
  }
}
