# Follow the steps below to setup the server. This is only for Ubuntu(I dislike windows now).

1. Update your system

```bash
sudo apt update && sudo apt upgrade -y
```

2. Install PostgreSQL + contrib package

```bash
sudo apt install postgresql postgresql-contrib -y
```

3. Service should be started after the installation, but its good to check.

```bash
sudo service postgresql status
If it didnt start, run:
sudo service postgresql start
```

4. Switch to the postgres user

```bash
sudo -i -u postgres
```

5. Create a PostgreSQL database user(Check your .env file now)

```bash
createuser --interactive
Enter name of role to add: "check your .env"
Shall the new role be a superuser? (y/n) y
```

6. Create your project database

```bash
createdb {name from your .env file}
```

7. Set password for your PostgreSQL user

```bash
psql
```

If you want your user to include uppercase letter, it should be wrapped with quotes

```sql
ALTER USER yourEnvFileUser WITH PASSWORD 'yourEnvFilePassword';
```

- Exit psql: `\q`
- Then exit postgres user: `exit`

8. Allow password authentication, because django needs it. We going to edit PostgresQL config:

```bash
sudo nano /etc/postgresql/*/main/pg_hba.conf
```

Find this line and change it to:

```diff
- local   all             all                                     peer
+ local   all             all                                     md5
```

Make sure you saved the file. Restart Postgres.

```bash
sudo service postgresql restart
```

9. Create and activate the venv

```bash
   python -m venv venv
   source venv/bin/activate
```

10. Install requirements.txt

```bash
pip install -r requirements.txt
```

11. Run migrations

```bash
python manage.py migrate
```

12. Create superuser and populate the places

```bash
python manage.py createsuperuser
python manage.py populate_places
```
