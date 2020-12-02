import os
from peewee import *
import datetime
from flask_login import UserMixin
from playhouse.db_url import connect


DATABASE = SqliteDatabase('trips.sqlite')


class User(UserMixin, Model):
    username=CharField(unique=True)
    email=CharField(unique=True)
    password=CharField()

    class Meta:
        database = DATABASE


class Trips(Model):
    trip_name = CharField()
    is_trip_public = CharField()
    trip_date = CharField()
    trip_owner = ForeignKeyField(User, backref='trips')
    stops = CharField()

    class Meta:
        database = DATABASE

class Posts(Model):
    user_posts = CharField()

    class Meta:
        database = DATABASE


class Pictures(Model):
    trip_pics = CharField()
    pic_comments = CharField()
    trip_post = ForeignKeyField(Trips, backref='')

    class Meta:
        database = DATABASE


class Comments(Model):
    comments = CharField()
    pic_owner = ForeignKeyField(Trips, backref='')

    class Meta:
        database = DATABASE

def initialize():
    DATABASE.connect()
    DATABASE.create_tables([User, Trips, Posts, Pictures, Comments], safe=True)
    print("TABLES Created")
    DATABASE.close()
