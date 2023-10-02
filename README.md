# DojoGroupProject

cd into client: npm i
cd into server: npm i

In your PGAdmin4 you'll want to create a new server (right click servers > register > server)
Under General: name it DojoGroupProject
Under Connection: host name: localhost
username: your PGadmin4 username
password: your PGadmin4 password

Now create a .env in your server folder with the following (you need to fill in the values other than "postgres"):

JWT_SECRET="whatever you want here" //only this should be in quotes

DB_NAME=postgres
DB_USER={pgadmin4 username}
DB_PASSWORD={pgadmin4 password}

Once you do that and you start your server it should automatically create your tables.  They will be empty so you'll have to populate them.