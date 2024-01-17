# Turbonea!

An example of an app utilising Drizzle and heavily leaning on Resolvers and Resolver fields.

To run:

```
npm install
docker-compose up
npm run drizzle:migrate
npm run start:dev
```

This is purely an example and you will need to put some dummy data into the database

You'll notice through querying that everything does a single simple query based on the resolver, allowing you to do extremely complex queries, but equally small ones if you needed to.

