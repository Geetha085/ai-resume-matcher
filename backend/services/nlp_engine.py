import re
import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

stop_words = set(stopwords.words('english'))

# Add extra non-skill words
custom_remove = {
    "looking", "experience", "developer", "required",
    "role", "responsible", "candidate"
}


def clean_text(text):
    # Remove punctuation
    text = re.sub(r"[^\w\s]", " ", text)

    words = text.lower().split()

    filtered = [
        word for word in words
        if word not in stop_words
        and word not in custom_remove
        and len(word) > 2
    ]

    return filtered


def calculate_match_score(resume_text, job_description):
    resume_clean = " ".join(clean_text(resume_text))
    jd_clean = " ".join(clean_text(job_description))

    documents = [resume_clean, jd_clean]

    tfidf = TfidfVectorizer()
    tfidf_matrix = tfidf.fit_transform(documents)

    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    return round(similarity[0][0] * 100, 2)


def skill_gap_analysis(resume_text, job_description):
    resume_words = set(clean_text(resume_text))
    jd_words = set(clean_text(job_description))

    matched = resume_words.intersection(jd_words)
    missing = jd_words - resume_words

    return {
        "matched_skills": sorted(list(matched)),
        "missing_skills": sorted(list(missing))
    }
