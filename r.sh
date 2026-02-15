#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
RUN_DIR="$ROOT/.run"
mkdir -p "$RUN_DIR"

# Kill any existing processes on our ports (clean start)
kill_by_port() {
  local port=$1
  if command -v lsof &>/dev/null; then
    local pids
    pids=$(lsof -ti :"$port" 2>/dev/null) || true
    [[ -n "$pids" ]] && echo "$pids" | xargs kill -9 2>/dev/null || true
  fi
}
BACKEND_PORT=8099
FRONTEND_PORT=5173

kill_by_port $BACKEND_PORT
kill_by_port $FRONTEND_PORT

# Compile Java only when sources are newer than target/
cd "$ROOT"
if [[ ! -d "$ROOT/target/classes" ]]; then
  echo "No target/classes; running mvn clean compile..."
  mvn -q clean compile
elif [[ -n $(find "$ROOT/src/main/java" -name "*.java" -newer "$ROOT/target/classes" -print -quit 2>/dev/null) ]]; then
  echo "Java sources newer than target; running mvn clean compile..."
  mvn -q clean compile
fi

# Start Spring Boot in background
echo "Starting Spring Boot on :$BACKEND_PORT..."
mvn -q spring-boot:run &
SPRING_PID=$!
echo $SPRING_PID > "$RUN_DIR/spring.pid"

# Wait until Spring Boot is ready to accept connections (then start Vite)
echo "Waiting for Spring Boot to be ready..."
max_attempts=60
attempt=0
while [ $attempt -lt $max_attempts ]; do
  if curl -s -o /dev/null -w "%{http_code}" "http://localhost:$BACKEND_PORT/api/items" 2>/dev/null | grep -q 200; then
    echo "Spring Boot is ready."
    break
  fi
  attempt=$((attempt + 1))
  sleep 1
done
if [ $attempt -eq $max_attempts ]; then
  echo "Warning: Spring Boot did not become ready in ${max_attempts}s. Starting Vite anyway."
fi

# Start Vite in background (GUI only after backend is ready)
cd "$ROOT/frontend"
echo "Starting Vite on :$FRONTEND_PORT..."
npm run dev &
VITE_PID=$!
echo $VITE_PID > "$RUN_DIR/vite.pid"

cd "$ROOT"
echo ""
echo "Running. Spring Boot PID=$SPRING_PID, Vite PID=$VITE_PID"
echo "Backend: http://localhost:$BACKEND_PORT  |  Frontend (HMR): http://localhost:$FRONTEND_PORT"
echo "Stop with: ./s.sh (or from another terminal)"
echo ""

# Let Vite print its banner, then show the launch link again so it's visible
sleep 3
echo ""
echo "  >>>  Open in browser:  http://localhost:$FRONTEND_PORT  <<<"
echo ""

# Wait for either process to exit (e.g. Ctrl+C will interrupt and exit)
wait $SPRING_PID $VITE_PID 2>/dev/null || true
