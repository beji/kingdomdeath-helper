FROM node:10.0-alpine
EXPOSE 3000
WORKDIR /usr/src/app
RUN npm install -g yarn
ADD . .
RUN yarn install
RUN yarn run build
RUN yarn run test
CMD ["yarn", "run", "prod"]