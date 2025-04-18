FROM node:22 AS builder

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install

COPY . .
RUN npm run build

FROM node:22

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json* /app/
RUN npm install --omit=dev

COPY --from=builder /app/build ./build
COPY --from=builder /app/.env ./

CMD ["npm", "run", "start"]
