import os
import fitz

from app.services.gemini_service import extract_text_from_image


def extract_text(pdf_path):

    document = fitz.open(pdf_path)

    print("Pages:", len(document))

    full_text = ""

    temp_folder = "temp_images"
    os.makedirs(temp_folder, exist_ok=True)

    for i, page in enumerate(document):

        print(f"Processing page {i+1}")

        text = page.get_text().strip()

        if text:

            print("Text PDF detected")

            full_text += text + "\n"

        else:

            print("Scanned PDF detected")

            pix = page.get_pixmap(dpi=300)

            image_path = os.path.join(
                temp_folder,
                f"page_{i}.png"
            )

            pix.save(image_path)

            extracted = extract_text_from_image(image_path)

            full_text += extracted + "\n"

            os.remove(image_path)

    document.close()

    return full_text