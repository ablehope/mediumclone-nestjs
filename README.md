npm install

Start App:
npm run start
npm run start:dev
npm run start:debug
npm run start:ts-node
npm run start:prod

DB Migration:
npm run db:drop
npm run db:create
npm run db:migrate
npm run db:seed

API:

tags
GET - {url}/tags

user
POST - {url}/users/login
GET - {url}/user
PUT - {url}/user

articles
GET - {url}/articles
POST - {url}/articles
GET - {url}/articles/{slug}
DELETE - {url}/articles/{slug}
PUT - {url}/articles/{slug}
POST - {url}/articles/{slug}/favorites
DELETE - {url}/articles/{slug}/favorites
GET - {url}/articles/feed

profile
GET - {url}/profiles/{username}
POST - {url}/profiles/{username}/follow
DELETE - {url}/profiles/{username}/follow

