import fitz

pdf_path = r"d:\02_PROJECTS\Startup_Projects\medicalsite\pdfs\PRODUCT LIST.pdf"
try:
    doc = fitz.open(pdf_path)
    print(f"Number of pages: {len(doc)}")
    for i in range(len(doc)):
        print(f"\n--- PAGE {i+1} ---")
        page = doc.load_page(i)
        text = page.get_text()
        print(text[:1500]) # print first 1500 characters of each page
    doc.close()
except Exception as e:
    print(f"Error: {e}")
