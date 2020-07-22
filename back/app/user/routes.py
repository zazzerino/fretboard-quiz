from flask import redirect, url_for
from flask_login import current_user, login_user, logout_user, login_required
from app import db
from app.user import bp
from app.models import User


@bp.route('/login', methods=['POST'])
def login():
    pass


# @bp.route('/login', methods=['GET', 'POST'])
# def login():
#     if current_user.is_authenticated:
#         flash('Already logged in.')
#         return redirect(url_for('index'))
#     form = LoginForm()
#     if form.validate_on_submit():
#         user = User.query.filter_by(username=form.username.data).first()
#         if user is None or not user.check_password(form.password.data):
#             flash('Username or password incorrect.')
#             return redirect(url_for('user.login'))
#         login_user(user)
#         flash('Logged in successfully.')
#         return redirect(url_for('index'))
#     return render_template('user/login.html', title='Sign In', form=form)


# @bp.route('/logout')
# def logout():
#     logout_user()
#     return redirect(url_for('index'))


# @bp.route('/register', methods=['GET', 'POST'])
# def register():
#     if current_user.is_authenticated:
#         return redirect(url_for('index'))
#     form = RegistrationForm()
#     if form.validate_on_submit():
#         user = User(username=form.username.data, email=form.email.data)
#         user.set_password(form.password.data)
#         db.session.add(user)
#         db.session.commit()
#         flash('Congratulation, you are now a registered user.')
#         return redirect(url_for('user.login'))
#     return render_template('user/register.html', title='Register', form=form)


# @bp.route('/<username>')
# @login_required
# def user(username):
#     user = User.query.filter_by(username=username).first_or_404()
#     scores = list(user.scores)
#     return render_template('user/user.html', user=user, scores=scores)
