#!/usr/bin/env bash
ROOT="$(cd "$(dirname "$0")" && pwd)"
RUN_DIR="$ROOT/.run"

kill_pid_file() {
  local label=$1
  local file=$2
  if [[ -f "$file" ]]; then
    local pid
    pid=$(cat "$file" 2>/dev/null)
    if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
      echo "Stopping $label (PID $pid)..."
      kill -9 "$pid" 2>/dev/null || true
      # Kill children (e.g. Java from Maven, node from npm)
      pkill -P "$pid" 2>/dev/null || true
    fi
    rm -f "$file"
  fi
}

# Kill by stored PIDs
kill_pid_file "Spring Boot" "$RUN_DIR/spring.pid"
kill_pid_file "Vite"       "$RUN_DIR/vite.pid"

# Fallback: kill by port in case PIDs weren't saved or processes were started elsewhere
kill_by_port() {
  local port=$1
  local name=$2
  if command -v lsof &>/dev/null; then
    local pids
    pids=$(lsof -ti :"$port" 2>/dev/null) || true
    if [[ -n "$pids" ]]; then
      echo "Stopping $name on port $port (PIDs: $pids)..."
      echo "$pids" | xargs kill -9 2>/dev/null || true
    fi
  fi
}
kill_by_port 8099 "Spring Boot"
kill_by_port 5173 "Vite"

# Clean run directory
rm -rf "$RUN_DIR"
echo "Done."
