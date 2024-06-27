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
            // key는't'의 'id'이며 이것을 나열한다.
            <li key={t.id}>
                {/* id=topics의 index 번호이다.
                'onClick' 이벤트를 부여한다
                해당 이벤트는 클릭 후에도 이전의 데이터가 유지되며 id의 값의 데이터타입이 숫자이도록 하며 모드를 변경한다. */}
                <a
                    id={t.id}
                    href={"/read/" + t.id}
                    onClick={(event) => {
                        event.preventDefault();
                        props.onChangeMode(Number(event.target.id));
                    }}
                >
                    {/* title의 값이 노출 */}
                    {t.title}
                </a>
            </li>
        );
    }
    // <nav>에 lis 객체를 리스트로 나열한다.
    return (
        <nav>
            <ol>{lis}</ol>
        </nav>
    );
}

// 'props'라는 객체를 가지고 있는 "Article"이라는 이름을 가진 함수
function Article(props) {
    // <article>에 h2 사이즈로 title의 값을 변환 + body의 값 변환
    return (
        <article>
            <h2>{props.title}</h2>
            {props.body}
        </article>
    );
}

function App() {
    // "useState"의 인자는 초기의 값이며 '_mode'는 그 값을 변경시킴
    //      const _mode = useState("WELCOME");
    //      const mode = _mode[0];
    //      const setMode = _mode[1];
    //      console.log("_mode", _mode);

    // 'mode'라는 변수를 받는 'setMode'라는 이름을 가진 함수로 선언하며 'useState'라는 리엑트에서 제공해주는 함수를 사용한다.
    // 'useState'는 "WELCOME"이라는 상태를 가진다
    const [mode, setMode] = useState("WELCOME");
    // 'id'라는 변수는 'setId'라는 이름을 가진 함수로 선언하며 'useState'라는 함수를 사용한다.
    // => 'useState'는 'null' 상태를 가진다
    const [id, setId] = useState(null);
    const topics = [
        { id: 1, title: "html", body: "html is ..." },
        { id: 2, title: "css", body: "css is ..." },
        { id: 3, title: "js", body: "js is ..." },
    ];

    // content가 아무것도 아닌 상태 null로 지정한다
    let content = null;
    // 만약에 'mode'가 "WELCOME"인 경우
    //  => 'content'는 title = "Welcome"으로 body는 "Hello,WEB"으로 출력한다.
    if (mode === "WELCOME") {
        content = <Article title="Welcome" body="Hello,WEB"></Article>;
    }
    // 만약에 mode가 "READ"인 경우
    // title과 body를  'null' 상태로 변경하며
    // 만약 topics의 배열 순서가 id와 같을 경우 'title'은 같은 순서의 'topics'의 title값을 'body'는 같은 순서의 'topics'의 title값을 출력하는 index 숫자가 0부터 시작하며 'topics'의 길이 만큼 1씩 증가하는 반복문을 선언한다.
    else if (mode === "READ") {
        let title,
            body = null;
        for (let i = 0; i < topics.length; i++) {
            if (topics[i].id === id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        // 'content'는 Article 객체 title의 값 & 객체 body의 값을 의미한다.
        content = <Article title={title} body={body}></Article>;
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
