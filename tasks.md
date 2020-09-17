# The best learning is the hands on learning

## task 01 - Wednesday

Create a new migration file.

npx sequelize migration:generate --name add-nemesis-column

Use it to add a new column named `nemesis` which holds a string.

If you complete the above then:
Bonus points if you can populate existing record column values.
aka fill the new column in existing rows.

## Thursday Setup - Get this file in your local!

`git remote` to view your remotes
`git remote add upstream https://github.com/SummerOfCode2020/week-16-super-hero-app` to access the cohort repo as a remote
`git remote -v` to confirm your remotes
`git pull upstream master` to get the latest

## task 02 - Thursday - REST Testing

Objective: Practice your REST Testing skills.

Review those http testing skills and the POST process.

Add goose-the-cat data to the database using the testing http file.

All about Goose: <https://www.marvel.com/characters/goose-the-cat>

## task 03 - Thursday - Refactoring

Objective: Practice refactoring and be able to understand how to use sequelize model filtering.

<https://sequelize.org/master/manual/model-querying-basics.html>

Improve our endpoint which show a single hero. Support access to the data by not only `slug` but also `id`.

Requires "refactoring", or in common terms "changing our existing code"

- we will change our naming in our code
  
    `getHeroBySlug` function will be renamed to `getHero` since the function will now get the hero by more than just the slug value.
    `:slug'` will become `:urlValue` and references to the param name of `slug` must also be renamed to reference `urlValue`

- update code to support finding a record by multiple filters

The `where` clause/filter which was a nice simple:

```js
{ where: { slug } }
```

becomes

```js
where: {
    [Op.or]: {
        slug: urlValue,
        id: urlValue
    }
}
```

<https://sequelize.org/v5/manual/querying.html#operators>

```js
    const getHero = async (request, response) => {
        try {
            const { urlValue } = request.params;

            const foundHero = await models.heroes.findOne({
                where: {
                    [Op.or]: {
                        slug: urlValue,
                        id: urlValue
                    }
                }
            });

            return foundHero ? response.send(foundHero) : response.sendStatus(404);
        } catch (error) {
            return response.status(500).send('Unable to retrieve hero, please try again');
        }
    };
```
