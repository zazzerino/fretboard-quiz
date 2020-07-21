import spacy
from profanity_filter import ProfanityFilter
from flask import Blueprint, request

# don't forget to run 'python3 -m spacy download en_core_web_sm'

bp = Blueprint('filter', __name__, url_prefix='/api/censor')

nlp = spacy.load('en_core_web_sm')
pf = ProfanityFilter(nlps={'en': nlp})
nlp.add_pipe(pf.spacy_component, last=True)


def censor(text):
    word = pf.censor_word(text)
    is_profane = word.original_profane_word is not None
    return {'original_text': word.uncensored,
            'censored_text': word.censored,
            'is_profane': is_profane}


@bp.route('/text', methods=['POST'])
def handle_censor():
    text = request.json['text']
    return censor(text)