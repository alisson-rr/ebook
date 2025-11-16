#!/usr/bin/env python3
"""
Simple HTTP server for testing the landing page locally.
Usage: python server.py
Then open http://localhost:8080 in your browser.
"""

import http.server
import socketserver
import os
import webbrowser
from threading import Timer

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add headers to prevent caching during development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Custom log format
        print(f"[{self.log_date_time_string()}] {format % args}")

def open_browser():
    """Open the default web browser after server starts."""
    webbrowser.open(f'http://localhost:{PORT}')

def main():
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🚀 Servidor rodando na porta {PORT}")
        print(f"📍 Acesse: http://localhost:{PORT}")
        print(f"📁 Servindo arquivos de: {DIRECTORY}")
        print("⏹️  Pressione Ctrl+C para parar o servidor\n")
        
        # Open browser after 1 second
        timer = Timer(1.0, open_browser)
        timer.start()
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n⏹️  Servidor encerrado.")

if __name__ == "__main__":
    main()
