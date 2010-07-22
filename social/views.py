# Create your views here.
from django.shortcuts import render_to_response
from social.forms import BroadcastForm, StatusForm, GEventForm, EventForm
from django.utils.safestring import mark_safe
from django.template.loader import render_to_string
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext
from django.conf import settings
import datetime
import facebook

try:
    import json
except:
    import django.utils.simplejson as json


def _broadcast(text):
    """Broadcast the text in the sites"""
    print text
    
def _feeds(user):
    """Get the social feeds for the user"""
    return []

def facebook_wall(request):
    fb_user = facebook.get_user_from_cookie(request.COOKIES, settings.FACEBOOK_APP_ID, settings.FACEBOOK_APP_SECRET)

    if fb_user:
        graph = facebook.GraphAPI(fb_user["access_token"])

        if request.method == "POST" and request.is_ajax():
            form =  StatusForm(request.POST)
            if form.is_valid():
                graph.put_wall_post(message=request.POST['status'])
                return HttpResponse(json.dumps({'status': 'saved'}), mimetype="application/json")
            else:
                return HttpResponse(json.dumps({'status': 'error'}), mimetype="application/json")
            
        else:

            feed = graph.get_connections('me', 'feed')
            feed_list = []
            for entry in feed['data']:
                if entry.has_key('message'):
                    feed_list.append(entry['message'])

            return HttpResponse(mark_safe(render_to_string('feed.html', {'feeds':feed_list})))

    else:
        return None


def facebook_events(request):
    fb_user = facebook.get_user_from_cookie(request.COOKIES, settings.FACEBOOK_APP_ID, settings.FACEBOOK_APP_SECRET)

    if fb_user:
        graph = facebook.GraphAPI(fb_user["access_token"])

        if request.method == "POST" and request.is_ajax():
            form =  EventForm(request.POST)
            if form.is_valid():
                graph.put_object('me', 'events', name=request.POST['name'],
                                 start_time=request.POST['start_time'],
                                 end_time=request.POST['end_time'])
                return HttpResponse(json.dumps({'status': 'saved'}), mimetype="application/json")
            else:
                
                return HttpResponse(json.dumps({'status': 'error'}), mimetype="application/json")

        else:

            feed = graph.get_connections('me', 'events')
            feed_list = []
            for entry in feed['data']:
                if entry.has_key('name'):
                    feed_list.append(entry['name'])

            return HttpResponse(mark_safe(render_to_string('feed.html', {'feeds':feed_list})))

    else:
        return None

def broadcast(request):
    """Post the broadcast and return the result via JSON, or show the form"""

    fb_wall = facebook_wall(request)
    if fb_wall:
        fb_wall = fb_wall.content
    fb_events = facebook_events(request)
    if fb_events:
        fb_events = fb_events.content
    
    if request.method == "POST":
        form = BroadcastForm(data=request.POST)
        if form.is_valid():
            _broadcast(form.cleaned_data['text'])
            return HttpResponse(json.dumps({'valid': True}), mimetype="application/json")
        else:
            return HttpResponse(json.dumps({'valid': False}), mimetype="application/json" )
    else:
        form = BroadcastForm()
        status_form = StatusForm()
        event_form = EventForm()
        return render_to_response('base.html', {'TWITTER': settings.TWITTER,
                                                'FACEBOOK_APP_ID': settings.FACEBOOK_APP_ID,
                                                'facebook_wall': fb_wall,
                                                'facebook_events': fb_events,
                                                'status_form':status_form,
                                                'gevent_form': GEventForm(initial = {'gevent_start': datetime.datetime.now().isoformat()[:-3],
                                                                                    'gevent_end': (datetime.datetime.now()+
                                                                                                   datetime.timedelta(hours=1)).isoformat()[:-3]
                                                                                    }),
                                                'event_form': event_form},context_instance=RequestContext(request))
                                                

def feeds(request):
    """Get a jsonlist of the feeds"""
    
    feeds = _feeds(request.user)
    return HttpResponse(json.dumps({'feed': mark_safe(render_to_string("feed.html", {'feed': feeds}))}))


