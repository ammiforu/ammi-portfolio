from PIL import Image, ImageOps
import os

src_path = r"C:\Users\ammif\.gemini\antigravity-ide\brain\8e08179f-b233-4888-9174-3b3cc9247e85\.user_uploaded\media_1790000439844.jpg"
img = Image.open(src_path)
w, h = img.size

# Look at the "FULL-BODY TURNAROUND" section in the image:
# Header is at y ~ 3px to 35px, x ~ 400 to 760
# Figures are located:
# y: from ~40px down to ~330px (just above the text labels "FRONT", "3/4 VIEW", "SIDE", "BACK" which are at y ~ 340-355px)
# x bounds:
# Fig 1 (Front): x ~ 395 to 490
# Fig 2 (3/4 View): x ~ 490 to 580
# Fig 3 (Side): x ~ 580 to 665
# Fig 4 (Back): x ~ 665 to 765

out_dir = r"d:\Jobprofile\public\assets\ammi"

fig1 = img.crop((395, 36, 495, 335))
fig2 = img.crop((495, 36, 585, 335))
fig3 = img.crop((580, 36, 665, 335))
fig4 = img.crop((665, 36, 765, 335))

fig1.save(os.path.join(out_dir, "raw_front.png"))
fig2.save(os.path.join(out_dir, "raw_threequarter.png"))
fig3.save(os.path.join(out_dir, "raw_side.png"))
fig4.save(os.path.join(out_dir, "raw_back.png"))

print("Saved raw turnaround figures:", fig1.size, fig2.size, fig3.size, fig4.size)
