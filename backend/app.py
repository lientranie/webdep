from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # needed for cross-domain requests, allow everything by default
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


# API route
@app.route('/api/v1/events', methods=['POST'])
def api():
    query = request.json
    events = requests.get('http://open-api.myhelsinki.fi/v1/events/').json().get('data')
    for event in events:
        if event.get('id') == query.get('id'):
            return jsonify(event)

@app.route('/api/v1/info', methods=['POST'])
def indexx():
    return "Helllooooooo"


            

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)