
import React from 'react'

const ViewNoteModal = ({ note, onClose, onEdit, onDelete }) => {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        if (isNaN(date.getTime())) return "No date"
        return date.toLocaleDateString('en-US', {
            day: 'numeric', month: 'short', year: '2-digit', 
            hour: '2-digit', minute: '2-digit'
        })
    }

    const handleEdit = () => {
        onEdit(note)
        onClose()
    }

    const handleDelete = () => {
        onDelete(note)
        onClose()
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4' onClick={onClose}>
            <div className='bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto' onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className='sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between'>
                    <h2 className='text-2xl font-bold text-slate-800 flex-1 break-words pr-4'>{note.title}</h2>
                    <button onClick={onClose} className='text-gray-400 hover:text-gray-700 text-2xl leading-none'>×</button>
                </div>

                {/* Content */}
                <div className='p-6'>
                    <p className='text-gray-700 leading-relaxed whitespace-pre-wrap break-words text-base'>
                        {note.description}
                    </p>
                </div>

                {/* Footer */}
                <div className='border-t border-gray-200 p-6 bg-gray-50 flex items-center justify-between gap-4'>
                    <p className='text-xs text-gray-500'>
                        Created: <span className='font-medium'>{formatDate(note.createdAt)}</span>
                    </p>
                    <div className='flex gap-3'>
                        <button 
                            onClick={handleEdit}
                            className='px-4 py-2 rounded-md text-sm font-medium bg-teal-500 text-white hover:bg-teal-600 transition'>
                            ✏️ Edit
                        </button>
                        <button 
                            onClick={handleDelete}
                            className='px-4 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition'>
                            🗑️ Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewNoteModal
