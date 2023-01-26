


export function HomePage({user}: {user: string}) {

    return (
        <div className="home">
            <h1 id='wordle-header' data-cy='home' >{`Welcome ${user}`}</h1>
        </div>
    )
}

