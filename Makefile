TAG=latest

build:
    docker buildx build --platform linux/amd64,linux/arm/v7 -t naohirokurasawa/blog:$(TAG) --push .

setup:
    docker buildx create --use --name mybuilder