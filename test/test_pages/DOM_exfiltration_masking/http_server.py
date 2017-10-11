from SimpleHTTPServer import SimpleHTTPRequestHandler
import SocketServer

PORT = 8000


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        SimpleHTTPRequestHandler.__init__(self, *args, **kwargs)

    def do_GET(self, *args, **kwargs):
        if self.path.startswith('/api/?callback=skimlinksApplyHandlers'):
            self.send_response(200)
            self.send_header("Content-Type", "application/javascript")
            self.end_headers()
            self.wfile.write("""
            /**/
            skimlinksApplyHandlers({
                "country": "US",
                "ts": 1507748514,
                "sessid": "791b04fbca7e58f43d3686fd659a748c",
                "csp": "lotame:1507748494",
                "guid": "820495529619bc8c09183c4dfd342c8c",
                "merchant_domains": []
            });
            """)
            return
        if self.path.startswith('/api/?callback=instantDataCallback'):
            self.send_response(200)
            self.send_header("Content-Type", "application/javascript")
            self.end_headers()
            self.wfile.write("""
            instantDataCallback({
                "nc": 1,
                "includes": ["body"],
                "excludes": [],
                "memcache": "10.16.13.23",
                "guid": "820495529619bc8c09183c4dfd342c8c",
                "sessid": "791b04fbca7e58f43d3686fd659a748c",
                "fc": 0,
                "nocache": 1,
                "read_onlys": ["title", "h1", "h2", "h3", "h4", "h5", "h6"]
            });
            """)
            return

        if self.path.startswith('/px.gif'):
            self.send_response(200)
            self.send_header("Content-Type", "image/gif")
            self.end_headers()
            with open('./px.gif', 'rb') as f:
                self.wfile.write(f.read())
            return

        return SimpleHTTPRequestHandler.do_GET(self, *args, **kwargs)


def main():
    try:
        httpd = SocketServer.TCPServer(("", PORT), Handler)
        print 'started httpserver...'
        httpd.serve_forever()
    except KeyboardInterrupt:
        print '^C received, shutting down server'
        httpd.socket.close()


if __name__ == '__main__':
    main()
