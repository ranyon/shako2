import os
import subprocess
import time
import glob

# Mapping of raw generated image prefix to final app image name
image_mapping = {
    'raw_loaded_fries': ['loadedFries.png'],
    'raw_yam_chicken_wings': ['yamChipsAndChickenWings.png'],
    'raw_yam_goat': ['yamChipsAndGoat.png'],
    'raw_loaded_yam': ['loadedYam.png', 'loadedYam.jfif'],
    'raw_side_kelewele': ['kelewele.png'],
    'raw_avocado_salad': ['avocadoSalad.png'],
    'raw_ghanaian_salad': ['ghanainSalad.png']
}

brain_dir = '/Users/marktheguy/.gemini/antigravity/brain/ceb5515c-fc84-4ff1-a4ce-41b76726fd7f'
app_img_dir = '/Users/marktheguy/.gemini/antigravity/scratch/360-taste/src/Components/order/foodImg'

raw_files = glob.glob(os.path.join(brain_dir, 'raw_*.png'))

for raw_file in raw_files:
    filename = os.path.basename(raw_file)
    # Find matching prefix
    for prefix, mapped_names in image_mapping.items():
        if filename.startswith(prefix):
            print(f"Processing {filename}...")
            
            # Since rembg is installed in the venv, we use it directly
            for mapped_name in mapped_names:
                final_path = os.path.join(app_img_dir, mapped_name)
                
                # Command to run rembg
                cmd = ["/Users/marktheguy/.gemini/antigravity/scratch/360-taste/venv_rembg/bin/rembg", "i", raw_file, final_path]
                
                try:
                    subprocess.run(cmd, check=True)
                    print(f"Successfully created {mapped_name}")
                except subprocess.CalledProcessError as e:
                    print(f"Failed to process {mapped_name}: {e}")
