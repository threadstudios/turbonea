# Turbonea!

An example of an app utilising Drizzle and heavily leaning on Dataloader, Resolvers and ResolveFields

To run:

```
npm install
docker-compose up
npm run drizzle:migrate
npm run start:dev
```

This is purely an example and you will need to put some dummy data into the database

## Test Authorization

Provide a header ala:

```
{
   "Authorization" : "YES"
}
```

To see the custom resolve around emails being returned if you are logged in only.
