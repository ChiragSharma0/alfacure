import os
import fitz

pdf_path = r"d:\02_PROJECTS\Startup_Projects\medicalsite\pdfs\PRODUCT LIST.pdf"
out_dir = r"d:\02_PROJECTS\Startup_Projects\medicalsite\design_images\product_list"
os.makedirs(out_dir, exist_ok=True)

try:
    doc = fitz.open(pdf_path)
    print(f"Converting {len(doc)} pages of PRODUCT LIST.pdf...")
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        # Use 120 DPI for faster rendering and smaller file size
        pix = page.get_pixmap(dpi=120)
        out_path = os.path.join(out_dir, f"page_{page_num + 1}.png")
        pix.save(out_path)
        print(f"Saved {out_path}")
    doc.close()
    print("Conversion complete!")
except Exception as e:
    print(f"Error: {e}")
