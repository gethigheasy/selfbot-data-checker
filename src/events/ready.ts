// src/events/ready.ts
import { CustomClient } from '../client/CustomClient';

export const name = 'ready';

export async function execute(client: CustomClient): Promise<void> {
  console.log(`✅ Bot online como ${client.user?.tag}`);
  console.log(`✅ Prefixo: ${process.env.PREFIX}`);
  console.log(`✅ ID do dono: ${process.env.OWNER_ID}`);
}
