import base64

message_base64 = input ("Base64 Coder: ")

message_bytes = message_base64.encode('ascii')
base64_bytes = base64.b64encode(message_bytes)
base64_message = base64_bytes.decode('ascii')

print(base64_message)