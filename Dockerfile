FROM node:18-slim
COPY . .
RUN npm run build-prod
CMD [ "node", "./build/main.js" ]
