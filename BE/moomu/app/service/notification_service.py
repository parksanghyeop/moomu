import requests


def send_notification(token_list, title, body):

    requests.post(
        "https://exp.host/--/api/v2/push/send",
        data={
            "to": token_list,
            "title": title,
            "body": body,
        },
    )
