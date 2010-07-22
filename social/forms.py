from django import forms

class BroadcastForm(forms.Form):
    text = forms.CharField(widget=forms.Textarea, max_length=140)

class StatusForm(forms.Form):
    status = forms.CharField(max_length=140, required=True)