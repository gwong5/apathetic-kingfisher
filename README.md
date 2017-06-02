# apathetic-kingfisher



# Instructions
After cloning the repo, you will need to add the absolute path for [data](https://github.com/kousagi1012/apathetic-kingfisher/tree/master/database/data) to their respectice queries in [schema.sql](https://github.com/kousagi1012/apathetic-kingfisher/blob/master/database/schema.sql):

```
at lines 32, 40, 50...

COPY artist FROM '/absolute_path_on_your_machine';
COPY song FROM '/absolute_path_on_your_machine';
COPY album FROM '/absolute_path_on_your_machine';
```
Then you will be ready to run these commands:
```
npm i && npm run initialize && npm start
```
If user database does not exist yet, you will have to create it:
```
$whoami
$createdb whoami
npm run initialize
```
