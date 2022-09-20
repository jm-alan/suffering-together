FROM node:18-slim AS backend-builder
WORKDIR /backend-staging
COPY ./backend/package.json .
RUN npm install
COPY ./backend/. .
RUN npm run build

FROM node:18-slim AS frontend-builder
WORKDIR /frontend-staging
COPY ./frontend/package.json .
RUN npm install
COPY ./frontend/. .
RUN npm run build

FROM node:18-slim AS final
WORKDIR /core
COPY ./package.json .
RUN npm install
COPY --from=backend-builder /backend-staging/build/. /core/
COPY --from=frontend-builder /frontend-staging/build /core/webapp

CMD [ "node", "main.js" ]
