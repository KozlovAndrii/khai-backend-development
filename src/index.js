const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const routes = {
  "/about": (req, res) => {
    res.write("<h1>about us page<h1>");
    res.end();
  },
  "/contact": (req, res) => {
    res.write("<h1>contact us page<h1>");
    res.end();
  },
};

class RouteManager {
  req;
  res;
  expectedRoute;

  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.expectedRoute = req.url;
  }

  exectute() {
    if (this.expectedRoute in routes) {
      return routes[this.expectedRoute](this.req, this.res);
    }

    this.fallback();
  }

  fallback() {
    this.res.write("<h1>Hello World!<h1>");
    this.res.write("<h2>My name Maks<h2>");
    this.res.end();
  }
}

const server = http.createServer((req, res) => {
  new RouteManager(req, res).exectute();
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server started at: http://localhost:${port}/`);
});
