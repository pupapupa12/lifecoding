import "./App.css";
import { useState } from "react";

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

function Create(props) {
    return (
        <article>
            <h2>Create</h2>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    const title = event.target.title.value;
                    const body = event.target.body.value;
                    props.onCreate(title, body);
                }}
            >
                <p>
                    <input type="text" name="title" placeholder="title"></input>
                </p>
                <p>
                    <textarea name="body" placeholder="body"></textarea>
                </p>
                <p>
                    <input type="submit" value="Create"></input>
                </p>
            </form>
        </article>
    );
}

function App() {
    const [mode, setMode] = useState("WELCOME");
    const [id, setId] = useState(null);
    const [nextId, setNextId] = useState(4);
    const [topics, setTopics] = useState([
        { id: 1, title: "html", body: "html is ..." },
        { id: 2, title: "css", body: "css is ..." },
        { id: 3, title: "js", body: "js is ..." },
    ]);

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
        content = <Article title={title} body={body}></Article>;
    } else if (mode === "CREATE") {
        content = (
            <Create
                onCreate={(_title, _body) => {
                    const newTopic = {
                        id: nextId,
                        title: _title,
                        body: _body,
                    };
                    const newTopics = [...topics];
                    newTopics.push(newTopic);
                    setTopics(newTopics);
                    //상세페이지
                    setMode("READ");
                    setId(nextId);
                    setNextId(nextId + 1);
                }}
            ></Create>
        );
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
            <a
                href="/create"
                onClick={(event) => {
                    event.preventDefault();
                    setMode("Create");
                }}
            >
                Create
            </a>
        </div>
    );
}

export default App;
