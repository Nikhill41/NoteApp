import React from 'react'

const EmptyState = ({searchQuery, onClear}) => {
    if (searchQuery) {
        return (
            <div className='col-span-4 flex flex-col items-center justify-center mt-20 text-center'>
                <div className='text-6xl mb-4'>🔍</div>
                <h2 className='text-xl font-semibold text-gray-600 mb-1'>No results found</h2>
                <p className='text-gray-400 text-sm'>No notes match "<span className='font-medium'>{searchQuery}</span>"</p>
                <button onClick={onClear} className='mt-4 text-teal-500 text-sm hover:underline'>
                    Clear search
                </button>
            </div>
        )
    }
    return (
        <div className='col-span-4 flex flex-col items-center justify-center mt-20 text-center'>
            <div className='text-6xl mb-4'>📝</div>
            <h2 className='text-xl font-semibold text-gray-600 mb-1'>No notes yet</h2>
            <p className='text-gray-400 text-sm'>Click the + button to create your first note!</p>
        </div>
    )
}

export default EmptyState