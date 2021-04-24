# Import SQLAlchemy `automap` and other dependencies here
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func
import psycopg2

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine(f'postgresql://{username}:{PASSWORD}@localhost:5432/Water_Mortalities')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

#save references to each table
Water = Base.classes.Water
Mortalities = Base.classes.mortalities

#Create Session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################



if __name__ == '__main__':
    app.run(debug=True)