FROM alpine:latest
LABEL author="muyi" 
CMD echo 'hello docker'
# how to use dockerfile 
# docker build -f first.Dockerfile -t learn:first .