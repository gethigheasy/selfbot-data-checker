import { Command } from '#types';
import { VoiceChannel } from 'discord.js-selfbot-v13';

export const command: Command = {
  name: 'lastvoice',
  description: 'Busca última chamada de voz do usuário',
  async execute(client, message, args) {
    const targetId = args[0];

    if (!targetId) {
      message.channel.send('❌ Você precisa informar um ID de usuário.');
      return;
    }

    try {
      let found = false;

      for (const [_, guild] of client.guilds.cache) {
        const voiceStates = guild.voiceStates.cache;
        const userVoiceState = voiceStates.get(targetId);

        if (userVoiceState) {
          const channel = userVoiceState.channel;
          if (channel && channel instanceof VoiceChannel) {
            let status = `🎙️ <@${targetId}> está em **${guild.name} / ${channel.name}**\n`;
            status += `⏱️ Entrou: <t:${Math.floor(Date.now() / 1000)}:R>\n`;

            if (userVoiceState.streaming) {
              status += `📺 **Streaming**\n`;
            }

            const member = guild.members.cache.get(targetId);
            if (member?.presence?.activities.length) {
              const game = member.presence.activities.find(a => a.type === 'PLAYING');
              if (game) {
                status += `🎮 **Jogando:** ${game.name}\n`;
              }
            }

            if (userVoiceState.mute) {
              status += `🔇 **Mutado**\n`;
            }

            if (userVoiceState.deaf) {
              status += `🔈 **Microfone desativado**\n`;
            }

            await message.channel.send(status);
            found = true;
            return;
          }
        }
      }

      if (!found) {
        message.channel.send(`❌ <@${targetId}> não está em nenhuma chamada de voz.`);
      }

    } catch (error) {
      console.error('❌ Erro ao executar .lastvoice:', error);
      message.channel.send('❌ Ocorreu um erro ao buscar a chamada de voz.');
    }
  }
}; 