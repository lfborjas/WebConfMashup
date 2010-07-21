from django import forms

class BroadcastForm(forms.Form):
    text = forms.CharField(widget=forms.Textarea, max_length=140)