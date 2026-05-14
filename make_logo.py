from PIL import Image, ImageDraw
import numpy as np
img = Image.open(r'C:\Users\axela\Desktop\grandbassamfood\public\logo_source.jpg').convert('RGBA')
w, h = img.size
cx, cy, rad = 530, 490, 455
x0, y0 = max(0, cx-rad-4), max(0, cy-rad-4)
x1, y1 = min(w, cx+rad+4), min(h, cy+rad+4)
crop = img.crop((x0, y0, x1, y1))
cw, ch = crop.size
mask = Image.new('L', (cw, ch), 0)
ImageDraw.Draw(mask).ellipse([3, 3, cw-3, ch-3], fill=255)
arr = np.array(crop)
arr[:, :, 3] = np.array(mask)
out = Image.fromarray(arr, 'RGBA').resize((480, 480), Image.LANCZOS)
out.save(r'C:\Users\axela\Desktop\grandbassamfood\public\logo.png')
print('logo.png saved OK')
