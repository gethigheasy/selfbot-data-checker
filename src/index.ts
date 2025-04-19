import { CustomClient } from '#client';
import { loadCommands, loadEvents } from '#utils';

const PREFIX = process.env.PREFIX;
const OWNER_ID = process.env.OWNER_ID;

if (!PREFIX || !OWNER_ID) {
  console.error('❌ PREFIX ou OWNER_ID não definidos no .env');
  process.exit(1);
}

const client = new CustomClient();

(async () => {
  await loadCommands(client);
  await loadEvents(client);

  client.login(process.env.TOKEN);
})();
