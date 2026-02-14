from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import Resume, MatchResult
from extensions import db
from services.nlp_engine import (
    calculate_match_score,
    skill_gap_analysis
)


match_bp = Blueprint('match', __name__, url_prefix='/match')


@match_bp.route('/analyze', methods=['POST'])
@jwt_required()
def analyze_match():
    data = request.get_json()

    resume_id = data.get('resume_id')
    job_description = data.get('job_description')

    resume = Resume.query.get(resume_id)

    if not resume:
        return jsonify({"message": "Resume not found"}), 404

    resume_text = f"{resume.skills} {resume.projects} {resume.education} {resume.experience}"

    score = calculate_match_score(resume_text, job_description)
    gap_analysis = skill_gap_analysis(resume_text, job_description)

    explanation = generate_explanation(score)

    new_result = MatchResult(
    resume_id=resume_id,
    job_description=job_description,
    match_score=score,
    missing_keywords=", ".join(gap_analysis["missing_skills"])
)


    db.session.add(new_result)
    db.session.commit()

    return jsonify({
    "match_score": score,
    "matched_skills": gap_analysis["matched_skills"],
    "missing_skills": gap_analysis["missing_skills"],
    "match_explanation": explanation
}), 200


def generate_explanation(score):
    if score > 80:
        return "Excellent match. Resume strongly aligns with job requirements."
    elif score > 60:
        return "Good match. Some important skills are missing."
    elif score > 40:
        return "Moderate match. Resume needs improvement."
    else:
        return "Low match. Significant skill gaps found."
