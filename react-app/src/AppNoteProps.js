import "./App.css";

// "props"변수를 받는 "Header"라는 이름의 함수
function Header(props) {
    // <header>안에 링크를 갖고있으며 'props'라는 객체에 'title'키를 가지고 있는 값을 <h1>타입의 문자를 반환해라
    return (
        <header>
            <h1>
                <a href="/">{props.title}</a>
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
        // t는 'props'객체의 'topic'이라는 키 이름을 가진 배열의 각각의 값
        let t = props.topics[i];

        //
        lis.push(
            <li key={t.id}>
                <a href={"/read/" + t.id}>{t.title}</a>
            </li>
        );
    }
    // <nav>안에 <ol>에 {lis}표현
    // 상단에 'lis' 선언한 부분 활용
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
            <Header title="REACT"></Header>
            {/* 컴포넌트 = Header / title = props  */}
            <Navigation topics={topics}></Navigation>
            <Article title="Welcome" body="Hello, WEB"></Article>
        </div>
    );
}

// export default App;
