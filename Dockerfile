FROM node:alpine AS ui-build
WORKDIR /usr/src/app
COPY ./client/ ./client/
RUN cd client && yarn install && yarn build

FROM node:alpine AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/client/build ./client/build
COPY package.json ./
RUN yarn install
COPY ./server.js ./

CMD ["yarn", "start"]
