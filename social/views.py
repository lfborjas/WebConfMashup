# Create your views here.
from django.shortcuts import render_to_response
from social.forms import BroadcastForm
from django.utils.safestring import mark_safe
from django.template.loader import render_to_string
import facebook

try:
    import json
except:
    import django.utils.simplejson as json
from django.http import HttpResponse
from django.template import RequestContext
from settings import FACEBOOK_APP_ID, FACEBOOK_APP_SECRET

def _broadcast(text):
    """Broadcast the text in the sites"""
    print text
    
def _feeds(user):
    """Get the social feeds for the user"""
    return []

def broadcast(request):
    """Post the broadcast and return the result via JSON, or show the form"""
    
    if request.method == "POST":
        form = BroadcastForm(data=request.POST)
        if form.is_valid():
            _broadcast(form.cleaned_data['text'])
            return HttpResponse(json.dumps({'valid': True}), mimetype="application/json")
        else:
            return HttpResponse(json.dumps({'valid': False}), mimetype="application/json" )
    else:
        form = BroadcastForm()
        return render_to_response('base.html', {'broadcast_form': form} ,context_instance=RequestContext(request))

def feeds(request):
    """Get a jsonlist of the feeds"""
    
    feeds = _feeds(request.user)
    return HttpResponse(json.dumps({'feed': mark_safe(render_to_string("feed.html", {'feed': feeds}))}))

def facebook_feed(request):
    fb_user = facebook.get_user_from_cookie(request.COOKIES, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET)

    if fb_user:
        graph = facebook.GraphAPI(fb_user["access_token"])
        feed = graph.get_connections('me', 'feed')
        feed_list = []
        for entry in feed['data']:
            if entry.has_key('message'):
                feed_list.append(entry['message'])

        return HttpResponse(mark_safe(render_to_string('feed.html', {'feeds':feed_list})))

