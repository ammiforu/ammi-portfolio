from PIL import Image
import os

src_path = r"C:\Users\ammif\.gemini\antigravity-ide\brain\8e08179f-b233-4888-9174-3b3cc9247e85\.user_uploaded\media_1790000439844.jpg"
img = Image.open(src_path)
out_dir = r"d:\Jobprofile\public\assets\ammi"

# 1. Main High-Resolution Hero Portrait
hero_portrait = img.crop((5, 65, 245, 355))
hero_portrait.save(os.path.join(out_dir, "ammi_hero_main.png"))

# 2. Head closeups
h_front = img.crop((5, 390, 130, 590))
h_front.save(os.path.join(out_dir, "head_front_clean.png"))

h_34 = img.crop((130, 390, 255, 590))
h_34.save(os.path.join(out_dir, "head_34_clean.png"))

h_side = img.crop((255, 390, 380, 590))
h_side.save(os.path.join(out_dir, "head_side_clean.png"))

# 3. Key Poses (y: 650 to 880)
# Arms Crossed (x: 8 to 75)
p_arms = img.crop((8, 650, 78, 880))
p_arms.save(os.path.join(out_dir, "pose_arms_clean.png"))

# Explaining (x: 80 to 150)
p_explain = img.crop((78, 650, 153, 880))
p_explain.save(os.path.join(out_dir, "pose_explain_clean.png"))

# Pointing (x: 155 to 220)
p_point = img.crop((153, 650, 220, 880))
p_point.save(os.path.join(out_dir, "pose_point_clean.png"))

# Laptop (x: 220 to 290)
p_laptop = img.crop((220, 650, 290, 880))
p_laptop.save(os.path.join(out_dir, "pose_laptop_clean.png"))

# Relaxed (x: 290 to 365)
p_relaxed = img.crop((290, 650, 365, 880))
p_relaxed.save(os.path.join(out_dir, "pose_relaxed_clean.png"))

# 4. Expressions
# Confident (row 2 col 2, around x: 480 to 570, y: 490 to 595)
exp_confident = img.crop((480, 490, 570, 595))
exp_confident.save(os.path.join(out_dir, "exp_confident.png"))

# Thinking (row 1 col 3, around x: 575 to 665, y: 385 to 490)
exp_thinking = img.crop((575, 385, 665, 490))
exp_thinking.save(os.path.join(out_dir, "exp_thinking.png"))

# Explaining (row 2 col 3, around x: 575 to 665, y: 490 to 595)
exp_explaining = img.crop((575, 490, 665, 595))
exp_explaining.save(os.path.join(out_dir, "exp_explaining.png"))

print("Cropped all clean character portrait assets!")
