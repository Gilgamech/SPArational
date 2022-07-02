--List of tables
SELECT tablename 
FROM pg_catalog.pg_tables
WHERE schemaname != 'pg_catalog' AND 
    schemaname != 'information_schema';


SELECT version()
SELECT * FROM Fruitbot;
--Drop TABLE Fruitbot;
CREATE TABLE Fruitbot (
   ID serial NOT NULL PRIMARY KEY,
	fruitbotWins int,
	simplebotWins int,
	botsTie int
);
INSERT INTO Fruitbot (fruitbotWins, simplebotWins, botsTie) SELECT 9870,5553,6375
UPDATE Fruitbot SET fruitbotWins = (SELECT fruitbotWins FROM Fruitbot)+1;
UPDATE Fruitbot SET simplebotWins = (SELECT simplebotWins FROM Fruitbot)+1;
UPDATE Fruitbot SET botsTie = (SELECT botsTie FROM Fruitbot)+1;


--Drop Table Chat;
CREATE TABLE Chat (
	ID serial NOT NULL PRIMARY KEY,
   timestamp timestamp default current_timestamp,
   userName VARCHAR (255) NOT NULL,
   chatRoom VARCHAR (255) NOT NULL,
   message VARCHAR (255) NOT NULL,
   attachments json
);

--DROP FUNCTION verifyLogin(a integer, b integer, c text)
CREATE FUNCTION verifyLogin(a integer, b integer, c text) RETURNS void AS $$

SELECT verifyLogin(2,4,'Gilgamech');

SELECT routine_name FROM information_schema.routines 
WHERE routine_type='FUNCTION' AND specific_schema='public';



Update Sites set pages=ARRAY[1,2,3,4,5,6,7,8,9,10,11,12] where applicationName='root'
//} end root queries


SELECT * FROM Sites where siteDomain='www.sparational.com' limit 1;
