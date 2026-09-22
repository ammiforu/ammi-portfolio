import os
from PIL import Image, ImageOps

out_dir = r"d:\Jobprofile\public\assets\turntable"
os.makedirs(out_dir, exist_ok=True)

ammi_dir = r"d:\Jobprofile\public\assets\ammi"

# Load the raw turnaround figures
f_front = Image.open(os.path.join(ammi_dir, "raw_front.png")).convert("RGB")
f_34 = Image.open(os.path.join(ammi_dir, "raw_threequarter.png")).convert("RGB")
f_side = Image.open(os.path.join(ammi_dir, "raw_side.png")).convert("RGB")
f_back = Image.open(os.path.join(ammi_dir, "raw_back.png")).convert("RGB")

# Create 3/4 back approximation or blend between side and back
f_34_back = Image.blend(f_side, f_back.resize(f_side.size), 0.6)

# Key angles (8 key points):
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

    # Resize/Crop to fill canvas (640x800 is aspect 0.8)
    def cover_resize(img, target_w, target_h):
        w, h = img.size
        aspect = w / float(h)
        target_aspect = target_w / float(target_h)
        
        if aspect > target_aspect:
            # Image is wider than target, scale by height
            new_h = target_h
            new_w = int(new_h * aspect)
        else:
            # Image is taller than target, scale by width
            new_w = target_w
            new_h = int(new_w / aspect)
            
        resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # Center crop
        left = (new_w - target_w) // 2
        top = (new_h - target_h) // 2
        
        # Shift crop slightly down to keep head in frame if it's tall
        top = max(0, top - 30)
        
        return resized.crop((left, top, left + target_w, top + target_h))

    u1 = cover_resize(img1, canvas_w, canvas_h)
    u2 = cover_resize(img2, canvas_w, canvas_h)

    # Blend between adjacent angles for buttery smooth rotation
    blended = Image.blend(u1, u2, alpha)

    # Save frame
    blended.save(os.path.join(out_dir, f"frame_{idx:02d}.webp"), "WEBP", quality=90)

print(f"Generated {total_frames} 360 degree turntable frames with Ammi's real high-res photos!")
