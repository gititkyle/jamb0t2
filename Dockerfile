FROM node:12.16.0

RUN mkdir -p /home/node/jamb0t2/node_modules && chown -R node:node /home/node/jamb0t2
RUN mkdir -p /home/node/var/log && chown -R node:node /home/node/var/log

WORKDIR /home/node/jamb0t2/

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

CMD ["node", "dist/app/app.js"]
