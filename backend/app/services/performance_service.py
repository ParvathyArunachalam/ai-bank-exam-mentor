import json
import re

from app.services.ai_service import model


def extract_json(text: str):
    """
    Extract JSON object from Gemini response.
    """

    text = text.strip()

    text = text.replace("```json", "")
    text = text.replace("```", "")

    match = re.search(r"\{.*\}", text, re.DOTALL)

    if match:
        return match.group(0)

    return text


def analyze_performance(score, total, percentage, results):

    prompt = f"""
You are an expert AI Bank Exam Mentor.

A student completed a mock test.

Score: {score}/{total}

Percentage: {percentage}

Question Results:
{json.dumps(results, indent=2)}

Analyze the student's performance.

Return ONLY VALID JSON.

Do not return markdown.
Do not add explanation.
Do not add comments.

Return exactly:

{{
    "overall_feedback":"",

    "strengths":[
        "",
        ""
    ],

    "weaknesses":[
        "",
        ""
    ],

    "study_plan":[
        "",
        "",
        ""
    ],

    "motivation":""
}}
"""

    response = model.generate_content(prompt)

    text = extract_json(response.text)

    print("\n========== PERFORMANCE RESPONSE ==========")
    print(text)
    print("==========================================\n")

    try:
        return json.loads(text)

    except Exception as e:

        print("Performance JSON Error:", e)

        return {
            "overall_feedback": "Performance analysis unavailable.",

            "strengths": [],

            "weaknesses": [],

            "study_plan": [],

            "motivation": "Keep practicing."
        }