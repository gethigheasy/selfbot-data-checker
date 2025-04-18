import { CustomClient } from './client/CustomClient';
import { loadCommands } from './utils/loader';
import dotenv from 'dotenv';
import { loadEvents } from './utils/loader';

dotenv.config();

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
