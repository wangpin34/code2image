PATH := ./node_modules/.bin:${PATH}

.PHONY: dev start build

dev: 
	vite

build:
	vite build --config vite.config.prod.js
	vite build --config vite.config.prod.background.js