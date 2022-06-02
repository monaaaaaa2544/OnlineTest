#!/bin/bash

echo "停止正在运行的docker容器"

sudo docker stop vue-app
sudo docker rm vue-app

sudo yarn install

echo "开始自动构建"

(sudo NODE_OPTIONS=--max_old_space_size=1024 yarn build)

exit_code=$?

echo $exit_code

if [ $exit_code -ne 0 ]
then 
  echo "编译失败，请检查"
  exit 1
else
  echo "编译成功，打包镜像为docker"
fi

sudo docker build --no-cache . -t online_test:latest


if [ $? -eq 0 ] 
then
  echo "打包镜像成功"
else 
  echo "打包镜像失败"
  exit 1
fi

echo "运行容器"
sudo docker run -d -p 80:80 -p 443:443 --name vue-app online_test:latest
# docker run -d --network=host --name vue-app libdashboard:latest

exit 0
