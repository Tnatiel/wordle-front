


export function HomePage({greet}: {greet: string}) {
      
    return (
        <div className="home">
            <h1 id='app-header' data-cy='home' >{greet}</h1>
        </div>
    )
}

