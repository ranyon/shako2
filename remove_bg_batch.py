import sys
import os
from rembg import remove
from PIL import Image

def process_image(input_path, output_path):
    print(f"Processing: {input_path}")
    try:
        input_image = Image.open(input_path)
        output_image = remove(input_image)
        
        # Ensure output directory exists
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        output_image.save(output_path)
        print(f"Saved: {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python remove_bg_batch.py <input_dir> <output_dir>")
        sys.exit(1)
        
    input_dir = sys.argv[1]
    output_dir = sys.argv[2]
    
    for filename in os.listdir(input_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            input_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, os.path.splitext(filename)[0] + ".png")
            process_image(input_path, output_path)
