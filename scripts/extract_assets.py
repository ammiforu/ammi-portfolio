import os
from PIL import Image

src_path = r"C:\Users\ammif\.gemini\antigravity-ide\brain\8e08179f-b233-4888-9174-3b3cc9247e85\.user_uploaded\media_1790000439844.jpg"
out_dir = r"d:\Jobprofile\public\assets\ammi"
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src_path)
w, h = img.size
print(f"Source image dimensions: {w}x{h}")

# The reference sheet layout:
# Top right is FULL-BODY TURNAROUND
# Looking at the image:
# Width is divided horizontally:
# Left column (~30% width) has AMMI EXPLAIN header and large portrait
# Right column (~70% width, x from ~0.31w to ~1.0w) has:
# CHARACTER PROFILE (x: ~0.31w to ~0.50w)
# FULL-BODY TURNAROUND (x: ~0.50w to ~1.0w, y: ~0.04h to ~0.35h)
# Let's write a small script to measure or extract precise bounding boxes.

# Let's save a copy of full reference sheet in public/assets
img.save(os.path.join(out_dir, "ammi_character_reference_sheet.jpg"), quality=95)

# Extract full body turnaround strip (x: 0.50w to 1.0w, y: 0.03h to 0.35h)
# 4 figures: FRONT, 3/4 VIEW, SIDE, BACK
turnaround_crop = img.crop((int(0.50 * w), int(0.03 * h), int(0.99 * w), int(0.35 * h)))
turnaround_crop.save(os.path.join(out_dir, "turnaround_strip.jpg"), quality=95)

tw, th = turnaround_crop.size
# Each figure is ~1/4 of this width
fig_w = tw / 4.0
front_body = turnaround_crop.crop((int(0 * fig_w), 0, int(1 * fig_w), th))
front_body.save(os.path.join(out_dir, "turnaround_front.png"))

threequarter_body = turnaround_crop.crop((int(1 * fig_w), 0, int(2 * fig_w), th))
threequarter_body.save(os.path.join(out_dir, "turnaround_threequarter.png"))

side_body = turnaround_crop.crop((int(2 * fig_w), 0, int(3 * fig_w), th))
side_body.save(os.path.join(out_dir, "turnaround_side.png"))

back_body = turnaround_crop.crop((int(3 * fig_w), 0, int(4 * fig_w), th))
back_body.save(os.path.join(out_dir, "turnaround_back.png"))

# Main Close-up portrait (top left)
portrait_main = img.crop((int(0.01 * w), int(0.06 * h), int(0.31 * w), int(0.35 * h)))
portrait_main.save(os.path.join(out_dir, "ammi_portrait_main.png"))

# Head closeups (around y: 0.38h to 0.60h, x: 0 to 0.5w)
head_front = img.crop((int(0.01 * w), int(0.38 * h), int(0.17 * w), int(0.60 * h)))
head_front.save(os.path.join(out_dir, "head_front.png"))

head_34 = img.crop((int(0.17 * w), int(0.38 * h), int(0.33 * w), int(0.60 * h)))
head_34.save(os.path.join(out_dir, "head_34.png"))

head_side = img.crop((int(0.33 * w), int(0.38 * h), int(0.50 * w), int(0.60 * h)))
head_side.save(os.path.join(out_dir, "head_side.png"))

# Pose studies (bottom left: y: 0.64h to 0.90h, x: 0 to 0.47w)
# 5 poses: ARMS CROSSED, EXPLAINING, POINTING, WITH LAPTOP, RELAXED
pose_strip = img.crop((int(0.01 * w), int(0.64 * h), int(0.47 * w), int(0.90 * h)))
pw, ph = pose_strip.size
pw_step = pw / 5.0

pose_arms_crossed = pose_strip.crop((int(0 * pw_step), 0, int(1 * pw_step), ph))
pose_arms_crossed.save(os.path.join(out_dir, "pose_arms_crossed.png"))

pose_explaining = pose_strip.crop((int(1 * pw_step), 0, int(2 * pw_step), ph))
pose_explaining.save(os.path.join(out_dir, "pose_explaining.png"))

pose_pointing = pose_strip.crop((int(2 * pw_step), 0, int(3 * pw_step), ph))
pose_pointing.save(os.path.join(out_dir, "pose_pointing.png"))

pose_with_laptop = pose_strip.crop((int(3 * pw_step), 0, int(4 * pw_step), ph))
pose_with_laptop.save(os.path.join(out_dir, "pose_laptop.png"))

pose_relaxed = pose_strip.crop((int(4 * pw_step), 0, int(5 * pw_step), ph))
pose_relaxed.save(os.path.join(out_dir, "pose_relaxed.png"))

print("Extracted all character assets successfully.")
