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
@app.route("/")
def welcome():
    """List static html page."""
    return (

    )


@app.route("/api/v1.0/water")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all water info"""
    # Query all water data
    results = session.query(Water.country, Water.year, Water.accessibility_percentage).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_water
    all_water = []
    for country, year, accessibility_percentage in results:
        water_dict = {}
        passenger_dict["country"] = country
        passenger_dict["year"] = year
        passenger_dict["accessibility_percentage"] = accessibility_percentage
        all_water.append(water_dict)

    return jsonify(all_water)





if __name__ == '__main__':
    app.run(debug=True)