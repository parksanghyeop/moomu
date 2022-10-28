from datetime import datetime, timedelta
from jose import jwt

from app.core.config import settings

ACCESS_EXPIRES = timedelta(hours=1)
REFRESH_EXPIRES = timedelta(days=14)

ALGORITHM = "HS256"


def generate_access_token(id: str):
    expire = datetime.utcnow() + ACCESS_EXPIRES
    to_encode = {"exp": expire, "id": id}
    encode_jwt = jwt.encode(to_encode, settings.ACCESS_KEY, algorithm=ALGORITHM)

    return {"access_token": encode_jwt, "token_type": "bearer"}

# def decode_token(token: str):
#       try:
#           decode_token = jwt.decode(token, ACCESS_KEY, ALGORITHM)
#           # if decode_token["exp"] >= datetime.time() else None
#           return decode_token['id']
#       except:
#           print(traceback.format_exc())
#           return False