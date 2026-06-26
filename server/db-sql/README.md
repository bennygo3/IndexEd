PostgreSQL / psql Cheat Sheet

-MOST USED QUERIES-

* SELECT
* INSERT
* UPDATE
* DELETE
* INNER JOIN
* LEFT JOIN
* GROUP BY
* ORDER BY
* HAVING
* LIMIT
* Aggregrate function (COUNT, SUM, AVG, etc)

Connect to PostgreSQL database:
    psql -d postgres

Connect to a specific database:
    psql -d indexed* ...... * = or other database name

Connect as a specific user
    psql -U postgres -d indexed

Display postgresql version
    SELECT version();

SQL
List all databases
    \l
or
    \list

SQL
Display current connection information
    \conninfo

SQL
Show current database
    SELECT current_database();

SQL
Show current user
    SELECT current_user;

-DATABASE COMMANDS-

SQL
Create a database
    CREATE DATABASE indexed;

SQL
Connect to a database
    \c indexed  ----> indexed is name of project

SQL
Delete a database
    Drop DATABASE indexed;

-TABLE COMMANDS-

List all tables
    \dt

Describe a table
    \d table_name

List all schemas
    \dn

List all relations
    \d

-HELPFUL SQL QUERIES-

View all rows
    SELECT * FROM table_name;

Count rows
    SELECT COUNT(*) FROM table_name;

Delete all rows (keep table)
    DELETE FROM table_name;

Delete all rows faster 
    TRUNCATE TABLE table_name;

Drop a table completely
    DROP TABLE table_name;

-psql Help-

Show psql commands
    \?

Show SQL command help
    \h

Show help for a specific SQL command
    \h CREATE TABLE



