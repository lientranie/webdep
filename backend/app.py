from flask import Flask, request
from flask_cors import CORS
import requests
from werkzeug.exceptions import HTTPException
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import requests


app = Flask(__name__)
CORS(app)  # needed for cross-domain requests, allow everything by default
app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

class App():         
    def queryplaces(category):
        now = datetime.now()
        response = Places.find_by_category(str(category))
        for k in range(len(response)):
            if response[k].get('Today') is not None and response[k].get('Today').get('opens') is not None and response[k].get('Today').get('closes') is not None:
                if now.strftime("%H:%M:%S") >= response[k].get('Today').get('opens') and now.strftime("%H:%M:%S") <= response[k].get('Today').get('closes'):
                    response[k]['openStatus'] = 'Open Now'
                else: 
                    response[k]['openStatus'] = 'Closed Now'
                response[k]['openTime'] = 'Open from '+ response[k].get('Today').get('opens') + ' to ' +response[k].get('Today').get('closes')

        return response

    def queryevents(category):
        events_res = requests.get('http://open-api.myhelsinki.fi/v1/events/?tags_search='+category)
        response = events_res.json().get('data')
        for k in range(len(response)):
            if response[k].get('event_dates').get('starting_day') is not None and response[k].get('event_dates').get('ending_day') is not None :
                response[k]['event_starting_day']= datetime.strptime(response[k].get('event_dates').get('starting_day') ,"%Y-%m-%dT%H:%M:%S.%fZ").strftime("%d-%m-%Y %H:%M:%S")
                response[k]['event_ending_day']= datetime.strptime(response[k].get('event_dates').get('ending_day') ,"%Y-%m-%dT%H:%M:%S.%fZ").strftime("%d-%m-%Y %H:%M:%S")
            else:
                response[k]['event_starting_day'] = 'no information'
                response[k]['event_ending_day'] = 'no information'

            if response[k].get('description').get('images') is not None and len(response[k].get('description').get('images')) !=0:
                response[k]['image_url'] = response[k].get('description').get('images')[0].get('url')
            else:
                response[k]['image_url'] = ''

        return response
        

class Places(db.Model):
    __tablename__ = 'Places'
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
    description_intro = db.Column(db.String(1200), unique=True, nullable=False)
    description_body = db.Column(db.String(1200), unique=True, nullable=False)
    Monday = db.Column(db.JSON(120), unique=True, nullable=False)
    Tuesday = db.Column(db.JSON(120), unique=True, nullable=False)
    Wednesday = db.Column(db.JSON(120), unique=True, nullable=False)
    Thursday = db.Column(db.JSON(120), unique=True, nullable=False)
    Saturday = db.Column(db.JSON(120), unique=True, nullable=False)
    Sunday = db.Column(db.JSON(120), unique=True, nullable=False)

    def save_to_db(self) -> None:
        """ Method for saving store object to db """
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_category(cls,category: str) -> "Places":
        """ Class Method for searching of places by category"""
        res = cls.query.filter(cls.tags.ilike('%{}%'.format(category))).all()
        response = [{'id': row.__dict__.get('id'),
                    'locality': row.__dict__.get('locality'),
                    'street_address': row.__dict__.get('street_address'),
                    'image_url': row.__dict__.get('image_url'), 
                    'lat': row.__dict__.get('lat'), 
                    'category': row.__dict__.get('category'), 
                    'name': row.__dict__.get('name'), 
                    'postal_code':row.__dict__.get('postal_code'),
                    'extra_info':row.__dict__.get('extra_info'),
                    'description_intro': row.__dict__.get('description_intro'),  
                    'description_body': row.__dict__.get('description_body'),  
                    'tags':row.__dict__.get('tags'), 
                    'lon':row.__dict__.get('lon'),
                    'Today': row.__dict__.get('{}'.format(datetime.now().strftime("%A"))),
                    'openTime': '',
                    'openStatus': 'no information'} for row in res if row]
        return response
    
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

@app.route('/api/v2/queryplaces', methods=['POST', 'GET'])
def queryplaces_callback():    
    query = request.json
    category =  query.get('category')
    response = App.queryplaces(category)
    return {'result': response}

@app.route('/api/v1/queryevents', methods=['POST', 'GET'])
def queryevents_callback():
    query = request.json
    category =  query.get('category')
    response = App.queryevents(category)    
    return {'result': response}
    

    

if __name__ == '__main__':
    app.run(port=5000, debug=True)