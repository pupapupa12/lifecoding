import "./App.css";

// "props"변수를 받는 "Header"라는 이름의 함수
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

// "props"변수를 받는 "Navigation"이라는 이름의 함수
function Navigation(props) {
    // 변하지 않는 'lis'라는 이름의 빈 배열을 선언
    const lis = [];

    // i = 0이고 'props'객체의 'topic'키 값의 갯수 만큼 반복되어서 작동하며 한번 작동 할때마다 i는 1씩 증가하는 반복문
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
