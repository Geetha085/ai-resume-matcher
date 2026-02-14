from flask import Flask
from extensions import db, jwt
from flask_cors import CORS


def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'this-is-a-very-secure-32-character-secret-key'


    CORS(app)

    db.init_app(app)
    jwt.init_app(app)

    from models import User, Resume, MatchResult
    from routes.auth import auth_bp
    from routes.resume import resume_bp
    from routes.matcher import match_bp

   

    app.register_blueprint(auth_bp)
    app.register_blueprint(resume_bp)
    app.register_blueprint(match_bp)

    return app

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
