import os
import subprocess

url = 'csasguitar.com'
root_dir = '/home/kdp/projects/fretboard-quiz/'
db_name = 'app.sqlite'
service_name = 'fretboard-quiz.service'
systemd_unit_dir = '/etc/systemd/system/'
nginx_dir = '/etc/nginx/'
owner_and_group = 'kdp:www-data'
build_dir = os.path.join(root_dir, 'front', 'build')
serve_dir = '/var/www'


def setup_backend():
    backend_dir = os.path.join(root_dir, 'back')
    os.chdir(backend_dir)
    print(f'setting up backend at {backend_dir}')

    env_dir = os.path.join(root_dir, 'back', 'env')

    if os.path.exists(env_dir):
        print(f'removing current virtualenv at {env_dir}')
        subprocess.run(['rm', '-rf', env_dir])

    print('creating virtualenv')
    subprocess.run(['python3', '-m', 'venv', 'env'])

    venv_pip = os.path.join(backend_dir, 'env', 'bin', 'pip')
    venv_flask = os.path.join(backend_dir, 'env', 'bin', 'flask')
    venv_python = os.path.join(backend_dir, 'env', 'bin', 'python3')

    print('installing requirements')
    subprocess.run([venv_pip, 'install', '-r', 'requirements.txt'])
    subprocess.run([venv_python, '-m', 'spacy', 'download', 'en_core_web_sm'])

    db_path = os.path.join(backend_dir, 'instance', db_name)
    if not os.path.exists(db_path):
        print('creating db')
        subprocess.run([venv_flask, 'init-db'])

    print('backend complete')


def setup_frontend():
    frontend_dir = os.path.join(root_dir, 'front')
    os.chdir(frontend_dir)

    print(f'installing npm deps and building frontend at {build_dir}')

    if not os.path.exists(os.path.join(frontend_dir, 'node_modules')):
        print('installing npm deps')
        subprocess.run(['npm', 'install'])

    subprocess.run(['npm', 'run', 'build'])

    print('frontend complete')


def move_files():
    os.chdir(serve_dir)
    site_path = os.path.join(serve_dir, url)

    print(f'removing {site_path}')
    subprocess.run(['rm', '-rf', url])
    subprocess.run(['mkdir', url])

    print(f'copying index.html to {serve_dir}')
    subprocess.run(['cp', '-r',
                    os.path.join(root_dir, 'index.html'), site_path])

    print(f'copying frontend to {site_path}/fretboard-quiz')
    subprocess.run(['cp', '-r', build_dir,
                    os.path.join(site_path, 'fretboard-quiz')])

    print('setting owner and permissions')
    subprocess.run(['chown', '-R', owner_and_group, site_path])
    subprocess.run(['chmod', '-R', '755', site_path])

    print('files moved')


def service_is_enabled(service_name):
    res = subprocess.run(['systemctl', 'is-enabled', service_name],
                         capture_output=True)
    return res.stdout == b'linked\n'


def setup_systemd_service():
    os.chdir(systemd_unit_dir)
    service_path = os.path.join(root_dir, service_name)
    print(f'starting {service_name} at {service_path}')

    if os.path.exists(os.path.join(systemd_unit_dir, service_name)):
        print('removing current service file')
        subprocess.run(['rm', os.path.join(systemd_unit_dir, service_name)])

    print(f'linking {service_name} at {systemd_unit_dir}')
    subprocess.run(['ln', '-s', service_path, service_name])

    if service_is_enabled(service_name):
        subprocess.run(['systemctl', 'restart', service_name])
        print(f'{service_name} restarted')
    else:
        subprocess.run(['systemctl', 'enable', service_name])
        subprocess.run(['systemctl', 'start', service_name])
        print(f'{service_name} enabled and started')


def setup_nginx():
    sites_available_path = os.path.join(nginx_dir, 'sites-available')
    sites_enabled_path = os.path.join(nginx_dir, 'sites-enabled')

    print(f'linking {url} at {sites_available_path}')
    os.chdir(sites_available_path)
    subprocess.run(['rm', url])
    subprocess.run(['ln', '-s', os.path.join(root_dir, url)])

    print(f'linking {url} at {sites_enabled_path}')
    os.chdir(sites_enabled_path)
    subprocess.run(['rm', url])
    subprocess.run(['ln', '-s', os.path.join(sites_available_path, url)])

    if service_is_enabled('nginx'):
        subprocess.run(['systemctl', 'restart', 'nginx'])
        print('nginx restarted')
    else:
        subprocess.run(['systemctl', 'enable', 'nginx'])
        subprocess.run(['systemctl', 'start', 'nginx'])
        print('nginx enabled and started')


def main():
    setup_backend()
    # setup_frontend()
    # move_files()
    # setup_systemd_service()
    # setup_nginx()


if __name__ == '__main__':
    main()
