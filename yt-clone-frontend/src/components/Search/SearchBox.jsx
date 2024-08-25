import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BsSearch } from "react-icons/bs";
import { MdKeyboardVoice } from "react-icons/md";
function SearchBox() {

    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    const handleSearch = ()=> {
        navigate("/results", {state: {query}})
    }

  return (
    <form className="-center">
    <div className="-search">
      <div className="-search-box">
        <input 
            type="text" 
            className="-search-input" 
            value={query} 
            onChange={(e)=> setQuery(e.target.value)}
        />
      </div>
      <button className="-btn" onClick={handleSearch}><BsSearch /></button>
    </div>
    <div className="-voice"><MdKeyboardVoice size={20}/></div>
  </form>
  )
}

export default SearchBox