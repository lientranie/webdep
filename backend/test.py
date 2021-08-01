from flask import request
from app import Places
from app import App
import app
import unittest
from unittest.mock import MagicMock
from unittest.mock import patch
import flask 
import datetime




places = Places
places.find_by_category = MagicMock(return_value=[{'id':1, 
    'name': 'Something' ,
    'locality' : 'Helsinki',
    'street_address' : 'somestreet',
    'image_url' : 'someurl',
    'lat' :'0' ,
    'lon' : '1',
    'category' : 'shopping',
    'extra_info' : 'no info',
    'tags' : 'shopping',
    'description_intro' : 'intro',
    'description_body' : 'body info',
    'Monday' : 'monday',
    'Tuesday' : 'tuesday',
    'Wednesday': 'wednesday',
    'Thursday' : 'thursday',
    'Saturday' : 'saturday',
    'Sunday' : 'sunday' ,
    }, 
    {'id':2, 
    'name': 'Something' ,
    'locality' : 'Espoo',
    'street_address' : 'somestreet',
    'image_url' : 'someurl',
    'lat' :'0' ,
    'lon' : '1',
    'category' : 'shopping',
    'extra_info' : 'no info',
    'tags' : 'shopping',
    'description_intro' : 'intro',
    'description_body' : 'body info',
    'Monday' : 'monday',
    'Tuesday' : 'tuesday',
    'Wednesday': 'wednesday',
    'Thursday' : 'thursday',
    'Saturday' : 'saturday',
    'Sunday' : 'sunday' },]    
    )
    
mockEvents = [{'id': 'event1',
                'name': 'somename1',
                'source_type': {'id': 1, 'name': 'LinkedEvents'},
                'info_url': None,
                'modified_at': '2021-08-01T12:49:17.407Z',
                'location': {'lat': 60.26133728027344,
                'lon': 24.853647232055664,
                'address': {'street_address': 'somestreet1',
                'postal_code': '01600',
                'locality': 'Vantaa'}},
                'description': {'intro': 'Event 1 intro',
                'body': '<p>Event 1 body.</p>',
                'images': [{'url': 'https://www.helmet.fi/download/noname/{BE939459-A402-472D-AA46-9EF617CCAAB5}/83703',
                    'copyright_holder': '',
                    'license_type': {'id': 1, 'name': 'All rights reserved.'}}]},
                'tags': [{'id': 'linkedevents:yso:p6062', 'name': 'games'},
                {'id': 'linkedevents:helmet:10675', 'name': 'Senior citizens'},],
                'event_dates': {'starting_day': '2021-12-29T13:00:00.000Z',
                'ending_day': '2021-12-29T18:00:00.000Z',
                'additional_description': None}},  
                {'id': 'event2',
                'name': 'somename2',
                'source_type': {'id': 2, 'name': 'LinkedEvents'},
                'info_url': None,
                'modified_at': '2021-08-01T12:49:17.407Z',
                'location': {'lat': 60.274574279785156,
                'lon': 25.03384017944336,
                'address': {'street_address': 'somestreet 2',
                'postal_code': '00750',
                'locality': 'Helsinki'}},
                'description': {'intro': 'Event 2 intro',
                'body': '<p>Event 2 body </p>',
                'images': [{'url': 'https://www.helmet.fi/download/noname/{AF0ED3B8-184E-4FA5-A48B-48C4A94DE2D1}/87796',
                    'copyright_holder': '',
                    'license_type': {'id': 1, 'name': 'All rights reserved.'}}]},
                'tags': [{'id': 'linkedevents:helmet:11727', 'name': 'Book clubs'},
                {'id': 'linkedevents:helmet:11916', 'name': 'Infonäytöt (Helsinki)'},],
                'event_dates': {'starting_day': '2021-12-11T11:00:00.000Z',
                'ending_day': '2021-12-28T12:30:00.000Z',
                'additional_description': None}},
]

def mocked_requests_get(*args, **kwargs):
    class MockResponse:
        def __init__(self, json_data, status_code):
            self.json_data = json_data
            self.status_code = status_code
        
        def json(self):
            return self.json_data
    if args[0].startswith('http://open-api.myhelsinki.fi/v1/events/'):
        
        return MockResponse({'data':mockEvents}, 200)    
    return MockResponse(None, 404)

class TestStringMethods(unittest.TestCase):
    def test_queryplaces(self):
        response = App.queryplaces('shopping')
        places.find_by_category.assert_called_with('shopping')
        self.assertEqual(len(response), 2)

    @patch('app.requests.get', side_effect=mocked_requests_get)
    def test_queryevents(self,mock_get):
        response = App.queryevents('shopping')
        self.assertEqual(len(response), 2)    




if __name__ == '__main__':
    unittest.main()