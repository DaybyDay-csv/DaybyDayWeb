#!/bin/bash
# Start Xvfb if not already running
if ! pgrep -f "Xvfb :99" > /dev/null; then
    /usr/bin/Xvfb :99 -screen 0 1920x1080x24 &
    sleep 2
fi

# Start Chrome with remote debugging
export DISPLAY=:99
if ! pgrep -f "chrome.*9222.*chrome-harness" > /dev/null; then
    /snap/chromium/3423/usr/lib/chromium-browser/chrome \
        --remote-debugging-port=9222 \
        --user-data-dir=/tmp/chrome-harness \
        --no-sandbox \
        --disable-dev-shm-usage \
        >> /root/logs/browser-harness.log 2>&1 &
fi