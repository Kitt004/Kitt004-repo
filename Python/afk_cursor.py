# ------------------------------------------------
# To run this, needs to intsall the pyautogui
# In Command, run the following
# "py -m pip install pyautogui"
# ------------------------------------------------

import pyautogui as pag
import random
import time

while True:
    x=random.randint(600,700)
    y=random.randint(200,600)
    pag.move(x,y,0.5)
    time.sleep(1.5)