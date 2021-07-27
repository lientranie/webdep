from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from werkzeug.exceptions import HTTPException
from flask_sqlalchemy import SQLAlchemy 


app = Flask(__name__)
CORS(app)  # needed for cross-domain requests, allow everything by default
app.debug = True

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///placesdb.db"
db = SQLAlchemy(app)

class Places(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    locality = db.Column(db.String(120), unique=True, nullable=False)
    street_address = db.Column(db.String(120), unique=True, nullable=False)
    image_url = db.Column(db.String(120), unique=True, nullable=False)
    lat = db.Column(db.String(120), unique=True, nullable=False)
    lon = db.Column(db.String(120), unique=True, nullable=False)
    category = db.Column(db.String(120), unique=True, nullable=False)
    postal_code = db.Column(db.String(120), unique=True, nullable=False)
    extra_info = db.Column(db.String(120), unique=True, nullable=False)
    tags = db.Column(db.String(120), unique=True, nullable=False)

    def save_to_db(self) -> None:
        """ Method for saving store object to db """
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_category(cls, category: str) -> "Places":
        """ Class Method for searching of places by category"""
        return cls.query.filter_by(category=category).all()
    
    def __repr__(self):
        return '<Places %r>' % self.name


# default route

@app.route('/')
def index():
    return "Index API"

# HTTP Errors handlers

@app.errorhandler(404)
def url_error(e):
    return """
    Wrong URL!
    <pre>{}</pre>""".format(e), 404

@app.errorhandler(500)
def server_error(e):
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500

@app.errorhandler(HTTPException)
def server_allerror(e):
    return { 'Error':"An internal error occurred: <pre>{}</pre> See logs for full stacktrace.".format(e)}, 500

    
# API route
@app.route('/api/v1/events', methods=['POST'])
def api():
    query = request.json
    events = requests.get('http://open-api.myhelsinki.fi/v1/events/').json().get('data')
    for event in events:
        if event.get('id') == query.get('id'):
            return jsonify(event)

@app.route('/api/v2/queryplaces', methods=['POST', 'GET'])
def indexx():
    query = request.json
    category =  query.get('category')
    print(category)    

    res = Places.find_by_category(str(category))
    print(res)
    response = [{'id': row.__dict__.get('id'),
                'locality': row.__dict__.get('locality'),
                'street_address': row.__dict__.get('street_address'),
                'image_url': row.__dict__.get('image_url'), 
                'lat': row.__dict__.get('lat'), 
                'category': row.__dict__.get('category'), 
                'name': row.__dict__.get('name'), 
                'postal_code':row.__dict__.get('postal_code'),
                'extra_info':row.__dict__.get('extra_info'),
                'tags':row.__dict__.get('tags'), 
                'lon':row.__dict__.get('lon')} for row in res if row]
    return {'result': response}

if __name__ == '__main__':
    app.run(port=5000, debug=True)