FROM node:lts-buster

ARG NPM_TOKEN
ARG APOLLO_KEY

RUN npm set @masterysystems:registry https://npm.pkg.github.com/
RUN npm set //npm.pkg.github.com/:_authToken $NPM_TOKEN

WORKDIR /opt/mastery-egress-voucher-consumer

COPY yarn.lock package.json codegen.yaml apollo.config.js ./
COPY ./scripts ./scripts
COPY ./src/graphql/* ./src/graphql/*
RUN yarn

COPY . .
RUN yarn build

ENV NODE_ENV=production

USER 1001

CMD ["yarn", "start"]
