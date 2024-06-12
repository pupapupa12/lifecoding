import "./App.css";

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
                        props.onChangeMode(event.target.id);
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
    const topics = [
        { id: 1, title: "html", body: "html is ..." },
        { id: 2, title: "css", body: "css is ..." },
        { id: 3, title: "js", body: "js is ..." },
    ];
    return (
        <div>
            <Header
                title="REACT"
                onChangeMode={function () {
                    alert("Header");
                }}
            ></Header>
            {/* 컴포넌트 = Header / title = props  */}
            <Navigation
                topics={topics}
                onChangeMode={(id) => {
                    alert(id);
                }}
            ></Navigation>
            <Article title="Welcome" body="Hello, WEB"></Article>
            {/* <Article title="Hi" body="Hello, React"></Article> */}
        </div>
    );
}

export default App;
