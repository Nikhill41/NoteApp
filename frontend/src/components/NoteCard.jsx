import React, { useState } from 'react'
import cardColors from '../constants/colors'

const NoteCard = ({note, index, onEdit, onDelete}) => {
    const [showOptions, setShowOptions] = useState(false)

    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        if (isNaN(date.getTime())) return "No date"
        return date.toLocaleDateString('en-US', {
            day: 'numeric', month: 'short', year: 'numeric'
        })
    }

    return (
        <div className={`${cardColors[index % cardColors.length]} 
            rounded-2xl p-5 shadow-sm hover:shadow-md 
            transition-all duration-200 hover:-translate-y-1
            flex flex-col justify-between min-h-[160px]
            border border-white relative`}
        >
            {/* 3-dot menu */}
            <button
                onClick={() => setShowOptions(!showOptions)}
                className='absolute top-3 right-3 text-gray-400 hover:text-gray-700 font-bold text-lg leading-none'>
                ⋮
            </button>

            {/* Dropdown */}
            {showOptions && (
                <div className='absolute top-8 right-3 bg-white rounded-xl shadow-lg z-10 overflow-hidden border border-gray-100'>
                    <button
                        onClick={() => { onEdit(note); setShowOptions(false) }}
                        className='flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left'>
                        ✏️ Edit
                    </button>
                    <button
                        onClick={() => { onDelete(note); setShowOptions(false) }}  // ✅ pass full note
                        className='flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 w-full text-left'>
                        🗑️ Delete
                    </button>
                </div>
            )}

            {/* Content */}
            <div>
                <h3 className='text-base font-bold text-gray-800 mb-2 line-clamp-1 pr-6'>
                    {note.title}
                </h3>
                <p className='text-sm text-gray-600 line-clamp-4 leading-relaxed'>
                    {note.description}
                </p>
            </div>

            {/* Date */}
            <div className='mt-4 pt-3 border-t border-black/10'>
                <p className='text-xs text-gray-400'>{formatDate(note.createdAt)}</p>
            </div>
        </div>
    )
}

export default NoteCard