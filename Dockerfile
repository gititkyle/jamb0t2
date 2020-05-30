FROM node:12.16.3

RUN mkdir -p /home/node/jamb0t2/node_modules && chown -R node:node /home/node/jamb0t2
RUN mkdir -p /home/node/var/log && chown -R node:node /home/node/var/log
# tmp - include vim for debugging inside container
RUN apt-get update && apt-get install -y vim

WORKDIR /home/node/jamb0t2/

COPY package*.json ./

USER node

RUN npm install --no-audit

COPY --chown=node:node . .

CMD ["node", "dist/app/app.js"]
