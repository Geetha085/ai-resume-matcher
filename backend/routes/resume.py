from flask import Blueprint, request, jsonify
from extensions import db
from models import Resume
from flask_jwt_extended import jwt_required, get_jwt_identity

resume_bp = Blueprint('resume', __name__, url_prefix='/resume')


# 📝 Save Resume (Protected)
@resume_bp.route('/create', methods=['POST'])
@jwt_required()
def create_resume():
    current_user_id = int(get_jwt_identity())



    data = request.get_json()

    skills = data.get('skills')
    projects = data.get('projects')
    education = data.get('education')
    experience = data.get('experience')

    new_resume = Resume(
        user_id=current_user_id,
        skills=skills,
        projects=projects,
        education=education,
        experience=experience
    )

    db.session.add(new_resume)
    db.session.commit()

    return jsonify({
        "message": "Resume saved successfully",
        "resume_id": new_resume.id
    }), 201
