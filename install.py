import os
import subprocess

url = 'csasguitar.com'
root_dir = '/home/kdp/projects/fretboard-quiz/'
systemd_unit_dir = '/etc/systemd/system/'
nginx_dir = '/etc/nginx/'


def setup_backend():
    backend_dir = os.path.join(root_dir, 'back')
    os.chdir(backend_dir)

    subprocess.run(['python3', '-m', 'venv', 'env'])

    venv_pip = os.path.join(backend_dir, 'env', 'bin', 'pip')
    venv_flask = os.path.join(backend_dir, 'env', 'bin', 'flask')

    subprocess.run([venv_pip, 'install', '-r', 'requirements.txt'])

    db_path = os.path.join(backend_dir, 'instance', 'app.sqlite')
    if not os.path.exists(db_path):
        print('creating db')
        subprocess.run([venv_flask, 'init-db'])

    print('backend complete')


def setup_frontend():
    frontend_dir = os.path.join(root_dir, 'front')
    os.chdir(frontend_dir)

    subprocess.run(['npm', 'install'])
    subprocess.run(['npm', 'run', 'build'])

    print('frontend complete')


def setup_systemd_service():
    os.chdir(systemd_unit_dir)

    filename = 'fretboard-quiz.service'
    filepath = os.path.join(root_dir, filename)

    subprocess.run(['rm', os.path.join(systemd_unit_dir, filename)])
    subprocess.run(['ln', '-s', filepath, filename])
    subprocess.run(['systemctl', 'enable', filename])
    subprocess.run(['systemctl', 'start', filename])

    print(f'{filename} started')


def setup_nginx():
    sites_available_path = os.path.join(nginx_dir, 'sites-available')
    sites_enabled_path = os.path.join(nginx_dir, 'sites-enabled')

    os.chdir(sites_available_path)
    subprocess.run(['rm', url])
    subprocess.run(['ln', '-s', os.path.join(root_dir, url)])

    os.chdir(sites_enabled_path)
    subprocess.run(['rm', url])
    subprocess.run(['ln', '-s', os.path.join(sites_available_path, url)])

    subprocess.run(['systemctl', 'enable', 'nginx'])
    subprocess.run(['systemctl', 'start', 'nginx'])

    print('nginx started')


def main():
    setup_backend()
    setup_frontend()
    setup_systemd_service()
    setup_nginx()


if __name__ == '__main__':
    main()
