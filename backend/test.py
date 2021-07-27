from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
category = 'Work & Study'
Base = automap_base()
engine = create_engine("sqlite:///placesdb.db")
Base.prepare(engine, reflect=True)
Places = Base.classes.places
session = Session(engine)
res = session.query(Places).where(Places.category == category)
response = [ row.__dict__ for row in res]
print(response)