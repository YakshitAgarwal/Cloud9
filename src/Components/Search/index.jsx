export default function Search({search, setSearch, handleSearch}){
    return(
        <div className="engine">
            <input 
                type="text" 
                placeholder="Enter City Name"
                value={search}
                onChange={(event)=> setSearch(event.target.value)}
                name="search"
            />
            <button className="btn" onClick={handleSearch}>Search</button>
        </div>
    )
}