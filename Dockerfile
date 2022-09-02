FROM node:16.0 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16.0
WORKDIR /app
COPY package.json .
COPY .env .
RUN npm install --only=production
COPY --from=build /app/dist ./dist
CMD npm run start:prod
# ENTRYPOINT ["sh", "/app/usr/docker-entrypoint.sh"]
# CMD ["node", "dist/main"]

# RUN chown -R node /usr/src/app
# USER node
# RUN ["chmod", "+x", "/usr/local/bin/docker-entrypoint.sh"]
# CMD ["chmod", "+x", "/usr/local/bin/docker-entrypoint.sh", "npm", "start"]
