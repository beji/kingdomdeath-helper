FROM node:10.0-alpine
EXPOSE 3000
WORKDIR /usr/src/app
ADD . .
RUN npm install yarn
RUN ./node_modules/.bin/yarn install
RUN ./node_modules/.bin/yarn run build
RUN ./node_modules/.bin/yarn run test-only
CMD ["./node_modules/.bin/yarn", "run", "prod"]