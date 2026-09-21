import os
from PIL import Image, ImageOps, ImageFilter

out_dir = r"d:\Jobprofile\public\assets\turntable"
os.makedirs(out_dir, exist_ok=True)

ammi_dir = r"d:\Jobprofile\public\assets\ammi"

# Load the raw turnaround figures
f_front = Image.open(os.path.join(ammi_dir, "raw_front.png"))
f_34 = Image.open(os.path.join(ammi_dir, "raw_threequarter.png"))
f_side = Image.open(os.path.join(ammi_dir, "raw_side.png"))
f_back = Image.open(os.path.join(ammi_dir, "raw_back.png"))

# Create 3/4 back approximation or blend between side and back
# We can create a 3/4 back by taking back view and slightly angling/warping or blending side/back
f_34_back = Image.blend(f_side, f_back.resize(f_side.size), 0.6)

# Key angles (8 key points):
# 0: Front (0 deg)
# 1: 3/4 Front (45 deg)
# 2: Side (90 deg)
# 3: 3/4 Back (135 deg)
# 4: Back (180 deg)
# 5: Opposite 3/4 Back (225 deg - mirrored 3/4 back)
# 6: Opposite Side (270 deg - mirrored side)
# 7: Opposite 3/4 Front (315 deg - mirrored 3/4)

key_images = [
    f_front,
    f_34,
    f_side,
    f_34_back,
    f_back,
    ImageOps.mirror(f_34_back),
    ImageOps.mirror(f_side),
    ImageOps.mirror(f_34),
]

# We want half-body portrait (waist up, ~60% top of the full body)
# Upper body from top to ~60% height
canvas_w, canvas_h = 640, 800

total_frames = 32
frames_per_key = total_frames / 8.0

for idx in range(total_frames):
    key_idx_float = idx / frames_per_key
    k1 = int(key_idx_float) % 8
    k2 = (k1 + 1) % 8
    alpha = key_idx_float - int(key_idx_float)

    img1 = key_images[k1]
    img2 = key_images[k2]

    # Crop upper-body (head to hips/waist: top 0% to 65% of figure)
    w1, h1 = img1.size
    upper1 = img1.crop((0, 0, w1, int(h1 * 0.62)))

    w2, h2 = img2.size
    upper2 = img2.crop((0, 0, w2, int(h2 * 0.62)))

    # Standardize size
    target_h = int(canvas_h * 0.78) # 78% of viewport height as required by Rule 6!
    
    scale1 = target_h / float(upper1.height)
    u1_resized = upper1.resize((int(upper1.width * scale1), target_h), Image.Resampling.LANCZOS)

    scale2 = target_h / float(upper2.height)
    u2_resized = upper2.resize((int(upper2.width * scale2), target_h), Image.Resampling.LANCZOS)

    # Standardize widths for cross-fade blending
    max_w = max(u1_resized.width, u2_resized.width)
    u1_pad = Image.new("RGBA", (max_w, target_h), (0, 0, 0, 0))
    u1_pad.paste(u1_resized, ((max_w - u1_resized.width) // 2, 0))

    u2_pad = Image.new("RGBA", (max_w, target_h), (0, 0, 0, 0))
    u2_pad.paste(u2_resized, ((max_w - u2_resized.width) // 2, 0))

    # Blend between adjacent angles for buttery smooth rotation
    blended = Image.blend(u1_pad.convert("RGB"), u2_pad.convert("RGB"), alpha)

    # Create dark luxury studio canvas
    frame = Image.new("RGB", (canvas_w, canvas_h), (8, 8, 10))
    
    # Paste centered
    paste_x = (canvas_w - blended.width) // 2
    paste_y = (canvas_h - target_h) // 2 + 10

    # Soft mask
    bw, bh = blended.size
    mask = Image.new("L", (bw, bh), 255)
    
    # Feather bottom slightly to blend into dark floor
    feather = Image.new("L", (bw, bh), 255)
    for fy in range(bh - 40, bh):
        alpha_v = int(255 * (bh - fy) / 40.0)
        for fx in range(bw):
            feather.putpixel((fx, fy), alpha_v)

    frame.paste(blended, (paste_x, paste_y), feather)

    # Save frame
    frame.save(os.path.join(out_dir, f"frame_{idx:02d}.webp"), "WEBP", quality=90)

print(f"Generated {total_frames} 360 degree turntable frames with Ammi's real photos!")
