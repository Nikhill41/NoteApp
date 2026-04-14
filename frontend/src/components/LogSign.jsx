import React from 'react'
import {Link} from 'react-router-dom'

function LogSign() {
    return (
        <div>
            <nav className="w-full bg-gray-900 px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-white text-xl font-bold">
        NoteApp
      </Link>
      </nav>
        </div>
    )
}

export default LogSign
