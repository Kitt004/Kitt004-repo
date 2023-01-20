import random

lower = "abcdefghijklmnñopqrstuvwxyz"
upper = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
numbers = "0123456789"
symbols = "!|@#$~%&¬()=?¿¡[*+]çÇ;,:._-"

string = lower + upper + numbers + symbols
length = 16

password = "".join(random.sample(string,length))

print("Password: " + password)
