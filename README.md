# Discord Selfbot - Fins Educativos

⚠️ **AVISO IMPORTANTE**: Este bot é um selfbot e seu uso viola os Termos de Serviço do Discord. Este projeto é apenas para fins educativos e de aprendizado. Não use em contas reais.

## Descrição
Um selfbot para Discord que permite rastrear atividades de usuários, como última mensagem enviada e status em chamadas de voz.

## Comandos
- `.lastmsg <ID>` - Mostra a última mensagem enviada pelo usuário
- `.lastvoice <ID>` - Mostra informações sobre a chamada de voz atual do usuário, incluindo:
  - Servidor e canal
  - Status de streaming
  - Status de jogo
  - Status de áudio (mutado/desativado)

## Configuração
1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```
3. Crie um arquivo `.env` com:
```
TOKEN=seu_token_aqui
PREFIX=.
OWNER_ID=seu_id_aqui
```

## Tecnologias
- TypeScript
- Discord.js-selfbot-v13
- Node.js

## Aviso Legal
Este projeto é apenas para fins educativos. O uso de selfbots viola os Termos de Serviço do Discord e pode resultar em banimento da sua conta. Use por sua conta e risco. 