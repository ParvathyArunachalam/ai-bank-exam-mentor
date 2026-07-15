import json
import re

from app.services.ai_service import model


def extract_json(text: str):

    text = text.strip()

    text = text.replace("```json", "")
    text = text.replace("```", "")

    match = re.search(r"\{.*\}", text, re.DOTALL)

    if match:
        return match.group(0)

    return text


def generate_recommendation(
    filename,
    topic,
    score,
    total,
    percentage
):

    prompt = f"""
You are an AI Bank Exam Mentor.

Filename:
{filename}

Topic:
{topic}

Score:
{score}/{total}

Percentage:
{percentage}

Return ONLY VALID JSON.

Return exactly:

{{
    "weak_topics":[
    ],

    "recommended_topics":[
    ],

    "study_time":"",

    "practice_questions":0,

    "difficulty":"",

    "next_mock_test":"",

    "motivation":""
}}

Do not return markdown.
Do not add explanation.
"""

    response = model.generate_content(prompt)

    text = extract_json(response.text)

    print("\n========== RECOMMENDATION RESPONSE ==========")
    print(text)
    print("=============================================\n")

    try:
        return json.loads(text)

    except Exception as e:

        print("Recommendation JSON Error:", e)

        return {

            "weak_topics": [],

            "recommended_topics": [],

            "study_time": "30 mins",

            "practice_questions": 20,

            "difficulty": "Medium",

            "next_mock_test": "General Aptitude",

            "motivation": "Keep practicing every day!"
        }