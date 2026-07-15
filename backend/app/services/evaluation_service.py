def evaluate_test(answers):

    score = 0
    results = []

    for answer in answers:

        correct = (
            answer["student_answer"].strip().lower()
            ==
            answer["correct_answer"].strip().lower()
        )

        if correct:
            score += 1

        results.append({
            "question": answer["question"],
            "student_answer": answer["student_answer"],
            "correct_answer": answer["correct_answer"],
            "correct": correct
        })

    total = len(answers)

    percentage = round((score / total) * 100, 2) if total else 0

    return {
        "score": score,
        "total": total,
        "percentage": percentage,
        "results": results
    }