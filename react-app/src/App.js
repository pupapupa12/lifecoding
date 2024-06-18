import "./App.css";
import { useState } from "react";
import { useId } from "react";

function Header(props) {
    // console.log("props", props, props.title);
    return (
        <header>
            <h1>
                <a
                    href="/"
                    // "=>" arrow function 어로우펑션
                    onClick={(event) => {
                        event.preventDefault();
                        props.onChangeMode();
                    }}
                >
                    {props.title}
                </a>
            </h1>
        </header>
    );
}

function Navigation(props) {
    const lis = [];
    for (let i = 0; i < props.topics.length; i++) {
        let t = props.topics[i];
        lis.push(
            <li key={t.id}>
                <a
                    id={t.id}
                    href={"/read/" + t.id}
                    onClick={(event) => {
                        event.preventDefault();
                        props.onChangeMode(Number(event.target.id));
                    }}
                >
                    {t.title}
                </a>
            </li>
        );
    }
    return (
        <nav>
            <ol>{lis}</ol>
        </nav>
    );
}

function Article(props) {
    return (
        <article>
            <h2>{props.title}</h2>
            {props.body}
        </article>
    );
}

function App() {
    //"useState"의 인자는 초기의 값이며 '_mode'는 그 값을 변경시킴
    //  const _mode = useState("WELCOME");
    //  const mode = _mode[0];
    //  const setMode = _mode[1];
    //  console.log("_mode", _mode);
    const [mode, setMode] = useState("WELCOME");
    const [id, setId] = useState(null);
    const topics = [
        { id: 1, title: "html", body: "html is ..." },
        { id: 2, title: "css", body: "css is ..." },
        { id: 3, title: "js", body: "js is ..." },
    ];
    let content = null;
    if (mode === "WELCOME") {
        content = <Article title="Welcome" body="Hello,WEB"></Article>;
    } else if (mode === "READ") {
        let title,
            body = null;
        for (let i = 0; i < topics.length; i++) {
            if (topics[i].id === id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = <Article title="Read" body="Hello,Read"></Article>;
    }

    return (
        <div>
            <Header
                title="WEB"
                onChangeMode={() => {
                    setMode("WELCOME");
                }}
            ></Header>
            <Navigation
                topics={topics}
                onChangeMode={(_id) => {
                    setMode("READ");
                    setId(_id);
                }}
            ></Navigation>
            {content}
            {/* <Article title="Hi" body="Hello, React"></Article> */}
        </div>
    );
}

export default App;
