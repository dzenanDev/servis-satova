#!/bin/sh
set -e

if [ -n "$REACT_APP_API_URL" ]; then
    echo "window.REACT_APP_API_URL='${REACT_APP_API_URL}'" | cat > ./config.js
else
    echo "window.REACT_APP_API_URL=null" | cat > ./config.js
fi

yarn global add serve
serve -s .