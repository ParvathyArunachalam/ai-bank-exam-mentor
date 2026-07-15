import fitz
import pytesseract
from PIL import Image


def extract_text(pdf_path):
    document = fitz.open(pdf_path)

    print("Pages:", len(document))

    text = ""

    for i, page in enumerate(document):
        print(f"Processing page {i + 1}")

        pix = page.get_pixmap(dpi=300)

        img = Image.frombytes(
            "RGB",
            [pix.width, pix.height],
            pix.samples
        )

        page_text = pytesseract.image_to_string(img)

        print("Characters extracted:", len(page_text))

        text += page_text

    document.close()

    return text