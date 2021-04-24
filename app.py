# Import SQLAlchemy `automap` and other dependencies here
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func
import psycopg2

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
engine = create_engine(f'postgresql://{username}:{PASSWORD}@localhost:5432/Water_Mortalities')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

#save references to each table
Water = Base.classes.water
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

# CREATE STATIC PAGES


#Home page
@app.route("/")
def home():
    """List static html page."""
    return render_template("index.html")


#Water visulisation page
@app.route("/water")
def water():
    """List static html page."""
    return render_template("water.html")


#Mortalities visulisation page
@app.route("/mortality")
def mortality():
    """List static html page."""
    return render_template("mortality.html")


#Comparison visulisation page
@app.route("/comparison")
def comparison():
    """List static html page."""
    return render_template("comparison.html")


# CREATE API PAGES


#Water API page
@app.route("/api/v1.0/jwater")
def jwater():
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
        water_dict["country"] = country
        water_dict["year"] = year
        water_dict["accessibility_percentage"] = accessibility_percentage
        all_water.append(water_dict)

    return jsonify(all_water)


#Mortalities API page
@app.route("/api/v1.0/jmortality")
def jmortality():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all mortality info"""
    # Query all mortality data
    results = session.query(Mortalities.country, Mortalities.year, Mortalities.gender, Mortalities.mortality_rate).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_mortalities
    all_mortalities = []
    for country, year, gender, mortality_rate in results:
        mortality_dict = {}
        mortality_dict["country"] = country
        mortality_dict["year"] = year
        mortality_dict["gender"] = gender
        mortality_dict["mortality_rate"] = mortality_rate
        all_mortalities.append(mortality_dict)

    return jsonify(all_mortalities)

if __name__ == '__main__':
    app.run(debug=True)