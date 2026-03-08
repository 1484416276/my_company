#!/bin/bash
# ZeroClaw Multi-Instance Starter
# Usage: ./start-zeroclaw.sh [start|stop|status|all] [id] [port]

CONFIG_DIR="$HOME/.zeroclaw"
LOG_DIR="/tmp/zeroclaw-logs"
mkdir -p "$LOG_DIR"

start_instance() {
  local id="$1"
  local port="$2"
  local config="$CONFIG_DIR/config-$id.json"
  
  if [ -f "$config" ]; then
    echo "Starting ZeroClaw instance: $id on port $port"
    nohup zeroclaw --config "$config" --port "$port" > "$LOG_DIR/$id.log" 2>&1 &
    echo $! > "$LOG_DIR/$id.pid"
    echo "Instance $id started with PID $(cat $LOG_DIR/$id.pid)"
  else
    echo "Config not found: $config"
  fi
}

stop_instance() {
  local id="$1"
  local pid_file="$LOG_DIR/$id.pid"
  if [ -f "$pid_file" ]; then
    kill $(cat "$pid_file") 2>/dev/null
    rm "$pid_file"
    echo "Instance $id stopped"
  fi
}

status() {
  echo "ZeroClaw Instances Status:"
  for pid_file in $LOG_DIR/*.pid; do
    if [ -f "$pid_file" ]; then
      local id=$(basename $pid_file .pid)
      local pid=$(cat $pid_file)
      if ps -p $pid > /dev/null 2>&1; then
        echo "  [RUNNING] $id (PID: $pid)"
      else
        echo "  [STOPPED] $id"
        rm $pid_file
      fi
    fi
  done
}

case "$1" in
  start) start_instance $2 $3 ;;
  stop) stop_instance $2 ;;
  status) status ;;
  all)
    start_instance ceo 3001
    start_instance cto 3002
    start_instance cfo 3003
    start_instance product-director 3004
    start_instance rd-lead 3005
    ;;
  *) echo "Usage: $0 {start|stop|status|all} [id] [port]" ;;
esac
