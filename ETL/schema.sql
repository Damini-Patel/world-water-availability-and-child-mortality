--Create table for water
CREATE TABLE water (
id SERIAL PRIMARY KEY, 
country TEXT,
year INT,
accessibility_percentage FLOAT
);

--Create table for mortalities
CREATE TABLE mortalities (
id SERIAL PRIMARY KEY,
country TEXT,
year INT,
gender TEXT,
mortality_rate FLOAT
);