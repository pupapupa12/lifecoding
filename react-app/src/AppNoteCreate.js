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

// props 변수를 가진 Create라는 이름의 함수
function Create(props) {
    return (
        <article>
            {/* h2사이즈로 Create 출력 */}
            <h2>Create</h2>
            {/* form 형식을 사용함
            onSubmit 이라는 리엑트 함수를 사용
            title은 이벤트의 title value값을 선언
            body는 이벤트의 body value 값을 선언
            onCreate 함수를 사용하여 title과 body 변수 생성 */}
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    const title = event.target.title.value;
                    const body = event.target.body.value;
                    props.onCreate(title, body);
                }}
            >
                {/* 'title'이름이며 사용자가 작성전 'title'이 표시되는 'text'타입의 입력 공간 */}
                <p>
                    <input type="text" name="title" placeholder="title"></input>
                </p>
                {/* 'body'이름이며 사용자가 작성전 'body'가 표시되는 텍스트 입력 공간 */}
                <p>
                    <textarea name="body" placeholder="body"></textarea>
                </p>
                {/* submit타입의 'Create'가 적힌 입력공간 */}
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
    // Create 함수 사용 후 생성되는 구간을 설정
    // nextId라는 변수를 가진 setNextId라는 이름을 가진 함수는 4번의 상태로 지정
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
    }
    // mode가 "CREATE"인 경우 content를 생성하라
    else if (mode === "CREATE") {
        // onCreate는 _title과 _body라는 변수를 가지고 있는 함수?객체?
        // newTopic은 id라는 키와 nextId라는 값 / title이라는 키와 _title이라는 값 / body라는 키와 _body라는 값을 가진 객체를 선언한다
        content = (
            <Create
                onCreate={(_title, _body) => {
                    const newTopic = {
                        id: nextId,
                        title: _title,
                        body: _body,
                    };
                    // newTopics은 'topics'배열을 복제한다
                    const newTopics = [...topics];
                    // newTopics에 추가한다
                    newTopics.push(newTopic);
                    setTopics(newTopics);
                    //상세페이지
                    // 상태를 "READ"로 설정하고 setNextId는 nextId에서 1 더한 값을 의미한다
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

// export default App;
