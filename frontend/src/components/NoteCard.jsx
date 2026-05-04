import React, { useState } from 'react'
import cardColors from '../constants/colors'

const NoteCard = ({note, index, onEdit, onDelete, onView}) => {
    const [showOptions, setShowOptions] = useState(false)

    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        if (isNaN(date.getTime())) return "No date"
        return date.toLocaleDateString('en-US', {
            day: 'numeric', month: 'short', year: 'numeric'
        })
    }

    const handleCardClick = (e) => {
        if (!showOptions && e.target.closest('button') === null) {
            onView?.(note)
        }
    }

    return (
        <div 
            onClick={handleCardClick}
            className={`${cardColors[index % cardColors.length]} rounded-lg p-4 shadow-sm hover:shadow-lg 
            transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer
            flex flex-col justify-between h-56 w-full
            relative border border-white/50`}
        >
            {/* 3-dot menu */}
            <button
                onClick={() => setShowOptions(!showOptions)}
                className='absolute top-2 right-2 text-gray-400 hover:text-gray-700 font-bold text-lg leading-none'>
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

            {/* Content - Fixed height, scrollable if needed */}
            <div className='flex-1 overflow-hidden'>
                <h3 className='text-sm font-bold text-gray-800 mb-1.5 line-clamp-2 pr-6'>
                    {note.title}
                </h3>
                <p className='text-xs text-gray-600 line-clamp-5 leading-relaxed'>
                    {note.description}
                </p>
            </div>

            {/* Date */}
            <div className='mt-2 pt-2 border-t border-black/10'>
                <p className='text-xs text-gray-400'>{formatDate(note.createdAt)}</p>
                <p className='text-xs text-gray-500 mt-1 font-medium'>Click to view full note</p>
            </div>
        </div>
    )
}

export default NoteCard