from flask import Blueprint, render_template, flash, redirect, url_for
from fretboardquiz.forms import LoginForm

from fretboardquiz.db import get_db


bp = Blueprint('user', __name__, url_prefix='/user')


@bp.route('/')
@bp.route('/index')
def index():
    return render_template('user.html', title='User')

@bp.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        flash(f'Login requested for user {form.username.data}, '
              f'remember_me={form.remember_me.data}')
        return redirect(url_for('user.index'))
    return render_template('login.html', title='Sign In', form=form)
