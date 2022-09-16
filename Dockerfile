FROM node:latest-slim
COPY . .
RUN npm run build
CMD [ "node", "./build/main.js" ]
