FROM node:20.11-alpine

# 设置时区
ENV TZ=Asia/Shanghai

RUN apk update \
    && apk add tzdata \
    && echo "${TZ}" > /etc/timezone \
    && ln -sf /usr/share/zoneinfo/${TZ} /etc/localtime \
    && rm /var/cache/apk/*

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com

RUN npm install -g pnpm pm2

COPY . .

RUN pnpm install 

# ARG NODE_ENV

# ENV NODE_ENV ${NODE_ENV}

RUN npm run build

CMD [ "pm2-runtime","dist/main.js"]

EXPOSE 3005
