# Setting up PostgreSQL on your machine (Mac OSX)

## Open up a terminal instance and run the following commands in order

1. brew install postgresql
    If you do not have homebrew installed on your mac, get it here: https://brew.sh/

2. brew services start postgresql

3. psql postgres

    You should now be in the postgres instance on your machine. 
    You can verify this by checking if your terminal lines now start with 'postgres=#'

4. \conninfo

    This command should return 'You are connected to database "postgres" as user'

5. CREATE ROLE me WITH LOGIN PASSWORD 'password1';

    This command will create a new role for us to use to interface with pg since the default 'postgres' user is like a super user, we want to stay off that.

6. ALTER ROLE me CREATEDB

    This provides the role 'me' with CREATEDB permissions

7. \q

    This exits us from the current session in pg

8. psql -d postgres -U me
    
    This connects us to pg with the new role we just created!
    Notice that the command prompt now shows postgres=> instead of postgres=#, this tells us that we are no longer logged in as a superuser.

9. Navigate into /server and run: npm run db:init

10. if you ever want to terminate postgres, you can run:
    brew services stop postgresql

More info: https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/



