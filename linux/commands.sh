nohup command > myout.file 2>&1 &
nohup java -jar target/eureka-server.jar > server.log 2>&1 &

jobs //查看运行在后台的任务 另一终端无效 
ps aux | grep eureka 

