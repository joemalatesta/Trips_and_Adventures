import models


from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from playhouse.shortcuts import model_to_dict


trip = Blueprint('trips', 'trip')


@trip.route('/all', methods=['GET'])
def get_all_the_trips():
    try:
        all_trips = [model_to_dict(trip) for trip in models.Trips]
        print(f"here is the list of trips. {all_trips}")
        return jsonify(data=all_trips, status={"code": 201, "message": "success"})

    except models.DoesNotExist:
        return jsonify(
        data={}, status={"code": 401, "message": "Error getting Resources"})


@trip.route('/', methods=['GET'])
def get_all_my_trips():
    try:
        trips = [model_to_dict(trip) for trip in current_user.trips]
        print(f"here is the list of trips. {trips}")
        return jsonify(data=trips, status={"code": 201, "message": "success"})

    except models.DoesNotExist:
        return jsonify(
        data={}, status={"code": 401, "message": "Error getting Resources"})


@trip.route('/', methods=["POST"])

def create_trip():
    try:
        payload = request.get_json()
        print(payload)
        created_trip = models.Trip.create(
        trip_name=payload['trip_name'],
        is_trip_public=payload['is_trip_public'],
        trip_date=payload['trip_date'],
        trip_pics=payload['trip_pics'],
        trip_comments=payload['trip_comments'],
        user=current_user.id)

        trip_dict = model_to_dict(created_trip)
        to_return = jsonify(data=trip_dict, status={"code": 201, "message": "Success"})
        print(to_return)
        return to_return
    except:
        return jsonify(status={"code": 400, "message": "Not Successful"})


@trip.route('/<id>', methods=["GET"])
def get_one_trip(id):
    trip = models.Trip.get_by_id(id)
    return jsonify(data=model_to_dict(trip), status={"code": 200, "message": "Success"})


@trip.route('/<id>', methods=["PUT"])
def update_trip(id):
    payload = request.get_json()
    query = models.Trip.update(**payload).where(models.Trip.id==id)
    query.execute()
    trip = model_to_dict(models.Trip.get_by_id(id))
    return jsonify(data=trip, status={"code": 200, "message": "Success"})


@trip.route('/<id>', methods=["DELETE"])
def delete_trip(id):
    delete_query = models.Trip.delete().where(models.Trip.id == id)
    num_of_rows_deleted = delete_query.execute()
    return jsonify(
    data={},
    message="{} So I went home. Didn't go on trip with id {}".format(num_of_rows_deleted, id),
    status={"code": 200}
    )


# end
