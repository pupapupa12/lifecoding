import "./App.css";
// react에 있는 'useState'를 사용한다
import { useState } from "react";
import { useId } from "react";

function Header(props) {
    // <header>안에 링크를 갖고있으며 'props'라는 객체에 'title'키를 가지고 있는 값을 <h1>타입의 문자를 반환하는 클릭 이벤트를 실행 시 'props'에 설정되어있는 changemode를 사용해라
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
    // 'lis'라는 빈 배열을 선언한다.
    const lis = [];

    // i = 0이고 'props'객체의 'topic'키 값의 갯수 만큼 반복되어서 작동하며 한번 작동 할때마다 i는 1씩 증가하는 반복문
    // => i=0 부터 한번 반복할 때 마다 1씩 증가한다. 총 'props'객체의 'topic'배열 값의 갯수 만큼 반복된다.
    for (let i = 0; i < props.topics.length; i++) {
        // t는 'props'객체의 'topic'이름을 가진 배열의 i번째 인덱스의 값을 가지고 있는 !변할 수 있는! 변수
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

// export default App;
