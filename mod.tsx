/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { serve } from "https://deno.land/std@0.122.0/http/server.ts";
import {
  Component,
  h,
  renderSSR,
} from "https://deno.land/x/nano_jsx@v0.0.28/mod.ts";

class CustomElementCounter extends Component {
  value = 0;

  // some custom CSS from Nano JSX
  static style = `
    .code-result button {
      cursor: pointer;
      margin-right: 4px;
      padding: 8px 12px;
    }`;

  changeValue(newValue: number) {
    this.value += newValue;
    this.update();
  }

  render() {
    return (
      <div class="code-result">
        <div id="counter-value">Counter: {this.value}</div>
        <button id="button-increment" onClick={() => this.changeValue(1)}>
          Increment
        </button>
        <button id="button-decrement" onClick={() => this.changeValue(-1)}>
          Decrement
        </button>
        <style>{CustomElementCounter.style}</style>
      </div>
    );
  }
}

function App() {
  return (
    <html>
      <head>
        <title>Hello from JSX</title>
      </head>
      <body>
        <h1>Hello</h1>
        <CustomElementCounter />
      </body>
    </html>
  );
}

function handler(_req: Request) {
  const html = renderSSR(<App />);

  return new Response(html, {
    headers: {
      "content-type": "text/html",
    },
  });
}

console.log("Listening on http://localhost:8000");
serve(handler);
