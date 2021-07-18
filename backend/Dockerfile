FROM node:14.17.2 AS server-build

# create app dir
WORKDIR /usr/src/chatter-app

# install packages
# the asterisk symbol ("*") is used to ensure that
# copy both package.json and package-lock.json
COPY package*.json ./

RUN yarn
# If you are creating a production assembly
# RUN npm ci --only = production

# copy the source code
COPY . .

# check files list
RUN ls -a

RUN yarn build

EXPOSE 3001
CMD [ "node", "./dist/server.js" ]