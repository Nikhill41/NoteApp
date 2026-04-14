import React from 'react'
import NoteCard from './NoteCard'
import SkeletonLoader from './SkeletonLoader'
import EmptyState from './EmptyState'

const NoteGrid = ({notes, loading, searchQuery, onClear, onEdit, onDelete}) => {
    return (
        <div className='p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 flex-grow'>
            {loading ? (
                <SkeletonLoader/>
            ) : notes.length === 0 ? (
                <EmptyState searchQuery={searchQuery} onClear={onClear}/>
            ) : (
                notes.map((note, index) => (
                    <NoteCard
                        key={note._id}
                        note={note}
                        index={index}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))
            )}
        </div>
    )
}

export default NoteGrid