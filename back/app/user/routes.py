from flask import Blueprint, render_template, flash, redirect, url_for
from flask_login import current_user, login_user, logout_user
from app import db
from app.user import bp
from app.user.forms import LoginForm, RegistrationForm
from app.models import User


@bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        flash(f'Already logged in.')
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            pass
        flash(f'Login requested for user {form.username.data}, '
              f'remember_me={form.remember_me.data}')
        return redirect(url_for('index'))
    return render_template('user/login.html', title='Sign In', form=form)


@bp.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))


@bp.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulation, you are now a registered user.')
        return redirect(url_for('user.login'))
    return render_template('user/register.html', title='Register', form=form)
