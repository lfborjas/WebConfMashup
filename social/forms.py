from django import forms

class BroadcastForm(forms.Form):
    text = forms.CharField(widget=forms.Textarea, max_length=140)

class StatusForm(forms.Form):
    status = forms.CharField(max_length=140, required=True)
    
class GEventForm(forms.Form):
    gevent_title = forms.CharField(label="Title")
    gevent_start = forms.DateTimeField(label="Start")
    gevent_end = forms.DateTimeField(label="End")