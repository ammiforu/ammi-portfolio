from PIL import Image
import os

img = Image.open(r"d:\Jobprofile\public\assets\ammi\turnaround_strip.jpg")
w, h = img.size
print(f"Strip size: {w}x{h}")

# In the strip, the labels "FRONT", "3/4 VIEW", "SIDE", "BACK" are at the bottom.
# Let's crop out the bottom text label bar (bottom ~30px) and top header if any.
# Let's test the height without the bottom label
# Let's create an optimized 360 sequence generator
