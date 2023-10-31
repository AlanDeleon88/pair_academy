## express / sequelize cl

### create migration file:
npx sequelize model:generate --name NameOfModel --attributes column1Name:value1,column2Name:value2
### create/find the database file and migrate it:
 npx dotenv sequelize-cli db:migrate (edited)

### generate a blank migration file:
npx sequelize migration:generate --name name-of-migration (edited)

### generate a blank seeder file:
npx sequelize seed:generate --name name-of-seed-file

### commit all seeder files:
npx dotenv sequelize db:seed:all

### undo all migrations:
npx dotenv sequelize db:migrate:undo:all

### undo all seeder files:
npx dotenv sequelize db:seed:undo:all
