import os
import glob
import re
from PIL import Image

# Ensure rembg is imported or available in this env
try:
    from rembg import remove
except ImportError:
    print("rembg not installed. Please run this script in the correct venv.")
    exit(1)

brain_dir = "/Users/marktheguy/.gemini/antigravity/brain/ceb5515c-fc84-4ff1-a4ce-41b76726fd7f"
output_dir = "/Users/marktheguy/.gemini/antigravity/scratch/360-taste/src/Components/order/foodImg"

# Find all raw_ images in the brain directory
raw_images = glob.glob(os.path.join(brain_dir, "raw_*.png"))

for img_path in raw_images:
    filename = os.path.basename(img_path)
    # Extract the original name by removing 'raw_' and the timestamp '_1234.png'
    match = re.match(r"raw_(.+?)_\d+\.png", filename)
    if match:
        clean_name = match.group(1)
        
        # Determine CamelCase or exact filename we need for menuData.jsx
        if "maxi_plain_rice" in clean_name: out_name = "maxiPlainRice.png"
        elif "fully_loaded_waakye" in clean_name: out_name = "fullyLoadedWaakye.png"
        elif "maxi_waakye" in clean_name: out_name = "maxiWaakye.png"
        elif "fully_loaded_jollof" in clean_name: out_name = "fullyLoadedJollof.png"
        elif "maxi_jollof" in clean_name: out_name = "maxiJollof.png"
        elif "mini_jollof" in clean_name: out_name = "miniJollof.png"
        elif "couscous_chicken" in clean_name: out_name = "couscousAndChickenSauce.png"
        elif "acheke_tilapia" in clean_name: out_name = "achekeAndTilapia.png"
        elif "assorted_fried_rice" in clean_name: out_name = "assortedFriedRice.png"
        elif "fried_rice_beef_sauce" in clean_name: out_name = "friedRiceWithBeefSauce.png"
        elif "assorted_jollof" in clean_name: out_name = "assortedJollof.png"
        elif "fully_loaded_zongo_rice" in clean_name: out_name = "fullyLoadedZongoRice.png"
        elif "zongo_rice" in clean_name: out_name = "zongoRice.png"
        elif "assorted_noodles" in clean_name: out_name = "assortedNoodles.png"
        else: out_name = f"{clean_name}.png"
        
        output_path = os.path.join(output_dir, out_name)
        
        print(f"Processing: {filename} -> {out_name}")
        try:
            input_image = Image.open(img_path)
            output_image = remove(input_image)
            output_image.save(output_path)
            print(f"Successfully saved {out_name}")
        except Exception as e:
            print(f"Error processing {filename}: {e}")

