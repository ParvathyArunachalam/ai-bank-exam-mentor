import os
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def extract_text_from_image(image_path):
    uploaded_file = genai.upload_file(image_path)

    response = model.generate_content(
        [
            "Extract all text from this image. Return only the extracted text.",
            uploaded_file,
        ]
    )

    return response.text