run:
	docker run -d -p 80:4200 --env-file ./.env --rm --name figma figmaimage
run-dev:
	docker run -d -p 
doimage:
	docker build -t figmaimage .