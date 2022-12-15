# EMS

Exam Management System

## Quickstart

1. Install required packages:

   ```
   npm install
   ```

2. Copy `env.sample` to `.env` and edit it with your settings.
   At least `DATABASE_URL` must be specified.

## Development

To run the server in development mode, with log pretty-printing
and hot-reload:

```
npm run devstart
```

To run the tests, run the `test` script (`npm run test`). There are
also related `coverage` (run tests and measure test coverage) and `lint`
(run linter) scripts you can use. ESLint is used for linting and its
configuration is specified in `.eslintrc.json`.

The code can be automatically using `prettier`. To manually run
prettier, use `npm run prettier`. Better yet, integrate your editor
to run it on save.

### Development shell

Development shell runs nodejs shell with the application object (`app`),
database models (`models`) and the configuration object (`config`)
already imported. To run the shell:

```
npm run shell
```

The shell supports toplevel async/await (ie. you can use async/await
directly in the shell if needed).

## Production

To run the app in production, run:

```
npm start
```

Logs will be sent to the standard output in JSON format.

## Deploying to Heroku

Initialize Git repository for the project, if you haven't already done so:

        git init
        git add .
        git commit -m 'initial commit'

In Heroku dashboard, create a new app named `ems`.
Initialize Heroku remote in the repository:

        heroku git:remote -a ems

Set up environment variables in Heroku dashboard. At least `DATABASE_URL`
needs to be provided (this will be set up automatically by Heroku when
you add a database addon). Default node environment (`NODE_ENV`) is set to
`production`.

See `env.sample` for more information.

Deploy the project:

        git push heroku master

After first deploy, make sure you enable the `web` dyno in Heroku dashboard
if it is not already enabled.
