#!/usr/bin/env python3
import subprocess
import time
import os
import signal
import sys

def start_server():
    env = os.environ.copy()
    process = subprocess.Popen(
        ['node', 'node_modules/.bin/next', 'dev', '-p', '3000'],
        cwd='/home/z/my-project',
        env=env,
        stdout=open('/tmp/next-manager.log', 'a'),
        stderr=subprocess.STDOUT,
        preexec_fn=os.setsid
    )
    return process

if __name__ == '__main__':
    print(f"Server manager starting, PID: {os.getpid()}", flush=True)
    while True:
        process = start_server()
        print(f"Started Next.js server, PID: {process.pid}", flush=True)
        
        # Wait for the process to die
        retcode = process.wait()
        print(f"Server exited with code {retcode}, restarting in 3s...", flush=True)
        time.sleep(3)
