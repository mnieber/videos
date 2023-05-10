ROOT_DIR:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

init-dev:
	pip install compile-env==0.4.1

compile-env:
	cd ${ROOT_DIR}/env/dev && compile-env env-spec.yaml

create-opt-paths:
	sudo mkdir -p /opt/projects/vidlito/frontend
	sudo touch    /opt/projects/video/frontend/fish_history
	sudo echo     "- cmd: echo 'start of the fish history'"  | sudo tee /opt/projects/video/frontend/fish_history > /dev/null
	sudo chmod -R 777 -p /opt/projects/vidlito

