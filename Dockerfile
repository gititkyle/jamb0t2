FROM node:12.16.0

RUN mkdir -p /jamb0t2/node/app/node_modules && chown -R node:node /jamb0t2/node/app

WORKDIR /jamb0t2/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

CMD ["node", "dist/app/app.js"]
