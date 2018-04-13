# Makefile to run docker

name=myresume
imageName=resume-md
imageTag=latest

.PHONY: help clean build run

help: ## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'
	@echo $(HOME)

guard-%:
	@ if [ "${${*}}" = "" ]; then \
		echo "Parameter required $*"; \
		exit 1; \
		fi

clean:
	@rm -rf ./build ./node_modules

build:
	docker build -t resume-md:latest .

run: guard-name
	@docker run -d -p 3000:3000 --name $(name) $(imageName):$(imageTag) yarn start
	@open http://localhost:3000
