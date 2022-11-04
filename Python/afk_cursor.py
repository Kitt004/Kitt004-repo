# ------------------------------------------------
# To run this, needs to install the pyautogui
# In Command, run the following
# "py -m pip install pyautogui"
# 
# FULL INSTRUCTIONS HERE
# https://pyautogui.readthedocs.io/en/latest/install.html#
# ------------------------------------------------

import pyautogui as pag
import time

while True:
    pag.move(20,40,0.3)
    time.sleep(2)
    pag.move(-20,-40,0.3)
    time.sleep(2)
