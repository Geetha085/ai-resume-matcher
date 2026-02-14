from extensions import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(200))

class Resume(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    skills = db.Column(db.Text)
    projects = db.Column(db.Text)
    education = db.Column(db.Text)
    experience = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class MatchResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    resume_id = db.Column(db.Integer, db.ForeignKey('resume.id'))
    job_description = db.Column(db.Text)
    match_score = db.Column(db.Float)
    missing_keywords = db.Column(db.Text)
