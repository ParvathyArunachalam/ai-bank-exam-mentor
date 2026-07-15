from dotenv import load_dotenv
load_dotenv()

import os
import google.generativeai as genai
import json

genai.configure(
    api_key=os.getenv("GOOGLE_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_answer(question, context):
    prompt = f"""
Context:
{context}

Question:
{question}

Answer using only the context.
"""

    response = model.generate_content(prompt)
    return response.text


def generate_mock_test(topic, context, number_of_questions):

    prompt = f"""
You are an AI Bank Exam Question Generator.

Generate {number_of_questions} multiple-choice questions on the topic "{topic}"
using ONLY the context below.

Return ONLY a valid JSON array.

Example:

[
  {{
    "question": "What is Normalization?",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "answer": "Option A"
  }}
]

Context:
{context}
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    text = text.replace("```json", "")
    text = text.replace("```", "")
    text = text.strip()

    try:
        return json.loads(text)
    except Exception:
        return []