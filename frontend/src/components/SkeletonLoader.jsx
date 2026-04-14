import React from 'react'

const SkeletonLoader = () => {
    return (
        <>
            {[...Array(6)].map((_, i) => (
                <div key={i} className='bg-white rounded-2xl p-5 shadow animate-pulse'>
                    <div className='h-4 bg-gray-200 rounded w-3/4 mb-3'></div>
                    <div className='h-3 bg-gray-200 rounded w-full mb-2'></div>
                    <div className='h-3 bg-gray-200 rounded w-5/6 mb-2'></div>
                    <div className='h-3 bg-gray-200 rounded w-4/6'></div>
                </div>
            ))}
        </>
    )
}

export default SkeletonLoader