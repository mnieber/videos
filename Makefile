ROOT_DIR:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

init-dev:
	pip install compile-env==0.4.1

compile-env:
	cd ${ROOT_DIR}/env/dev && compile-env env-spec.yaml

create-opt-paths:
	sudo touch    /opt/video/frontend/fish_history
	sudo echo     "- cmd: echo 'start of the fish history'"  | sudo tee /opt/video/frontend/fish_history > /dev/null
