import { render } from "react-dom";
import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
import shuffle from "lodash/shuffle";
import "./styles.css";

let data = [
  {
    name: "Rare Wind"
  },
  {
    name: "Saint Petersburg"
  },
  {
    name: "Deep Blue"
  },
  {
    name: "Ripe Malinka"
  },
  {
    name: "Near Moon"
  },
  {
    name: "Wild Apple"
  }
];

function App() {
  const [rows, set] = useState(data);
  const height = 20;
  const width = 110;
  const transitions = useTransition(
    rows.map((data, i) => ({ ...data, x: i * width, y: i * height })),
    (d) => d.name,
    {
      from: { position: "absolute", opacity: 0 },
      leave: { opacity: 0 },
      enter: ({ x, y }) => ({ x, y, opacity: 1 }),
      update: ({ x, y }) => ({ x, y })
    }
  );

  return (
    <div class="list">
      <button
        onClick={() =>
          set([
            ...rows.slice(1, rows.length),
            { name: `list item ${Math.floor(Math.random() * 1000)}` }
          ])
        }
      >
        add first
      </button>

      <div
        class="list"
        style={{
          position: "relative",
          width: 660,
          height: 60,
          backgroundColor: "red",
          marginTop: 20
        }}
      >
        {transitions.map(({ item, props: { x, y, ...rest }, key }, index) => (
          <animated.div
            key={key}
            class="card"
            style={{
              top: 20,
              textAlign: "center",
              transform: x.interpolate((x) => `translate3d(${x}px,0,0)`),
              ...rest
            }}
          >
            <div
              class="cell"
              style={{ background: "blue", width: "100%", display: "block" }}
            >
              <div class="details">{item.name}</div>
            </div>
          </animated.div>
        ))}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
