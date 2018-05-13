FROM node:10.0-alpine as builder
ENV NODE_ENV=production
WORKDIR /usr/src/app
ADD . .
RUN npm -g install yarn
RUN chmod +x /usr/local/bin/yarn
RUN yarn install --production=false
RUN yarn run build
RUN yarn run test-only
RUN ./node_modules/.bin/tsc
# CMD ["./node_modules/.bin/yarn", "run", "prod"]

FROM node:10.0-alpine
EXPOSE 3000
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/src/hmr.js ./src/hmr.js
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/yarn.lock ./yarn.lock
RUN npm -g install yarn
RUN chmod +x /usr/local/bin/yarn
RUN yarn --production=true
CMD ["node", "src/hmr.js"]