DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔\033[39m
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#

PRETOTYPE = ./app/styles/app.css
PRETOTYPE_RESPONSIVE = ./app/styles/app-responsive.css
PRETOTYPE_LESS = ./app/less/main.less
PRETOTYPE_RESPONSIVE_LESS = ./app/less/main-responsive.less
SHA := $(shell git rev-parse HEAD)

build: styles
	@echo "\n${HR}"
	@echo "clean up dist folder"
	@rm -rf dist
	@mkdir -p dist
	@mkdir -p dist/styles
	@echo "${HR}\n"
	@echo "\n${HR}"
	@echo "Optimalization with r.js"
	@./node_modules/.bin/r.js -o app/build/app.build.js
	@cp -rf app/styles/*.css dist/styles/
	@sed -e "s/{{ version_data }}/${SHA}/g" app/appBin.html > dist/index.html
	@echo "${HR}\n"
	@echo "build done,  ${DATE}."

styles:
	@echo "\n${HR}"
	@echo "less->css"
	@./node_modules/.bin/recess --compress ${PRETOTYPE_LESS} > ${PRETOTYPE}
	@./node_modules/.bin/recess --compress ${PRETOTYPE_RESPONSIVE_LESS} > ${PRETOTYPE_RESPONSIVE}

styles-dev:
	@echo "\n${HR}"
	@echo "less->css"
	@./node_modules/.bin/recess --compile ${PRETOTYPE_LESS} > ${PRETOTYPE}
	@./node_modules/.bin/recess --compile ${PRETOTYPE_RESPONSIVE_LESS} > ${PRETOTYPE_RESPONSIVE}

clean:
	@rm -r dist

server:
	cd dist; python -m SimpleHTTPServer

dev: styles-dev
	cd app; python -m SimpleHTTPServer

watch:
	echo "Watching less files..."; \
	watchr -e "watch('app/less/.*\.less') { system 'make styles-dev' }"

setup:
	npm install
	@./node_modules/.bin/bower install
