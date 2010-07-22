from django import forms

class BroadcastForm(forms.Form):
    text = forms.CharField(widget=forms.Textarea, max_length=140)

class StatusForm(forms.Form):
    status = forms.CharField(max_length=140, required=True)

class EventForm(forms.Form):
    name = forms.CharField(max_length=50, required=True)
    start_time = forms.DateTimeField(required=True)
    end_time = forms.DateTimeField(required=True)