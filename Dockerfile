FROM node:9.11-alpine
EXPOSE 3000
WORKDIR /usr/src/app
RUN npm install -g yarn
ADD . .
RUN yarn install
RUN yarn run build
RUN yarn run test
CMD ["yarn", "run", "prod"]