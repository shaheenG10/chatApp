import json
from channels.generic.websocket import WebsocketConsumer
from .models import Message
from django.contrib.auth import get_user_model

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        data = json.loads(text_data)
        message = Message.objects.create(
            sender=self.scope['user'],
            recipient=get_user_model().objects.get(username=data['recipient']),
            content=data['content']
        )
        self.send(text_data=json.dumps({
            'sender': message.sender.username,
            'content': message.content,
            'timestamp': str(message.timestamp),
        }))