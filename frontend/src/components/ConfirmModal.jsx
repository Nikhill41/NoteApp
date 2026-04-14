import React from 'react'

const ConfirmModal = ({onConfirm, onCancel, noteTitle}) => {
    return (
        <div
            className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'
            onClick={onCancel}>
            <div
                className='bg-white rounded-2xl p-6 w-80 shadow-2xl'
                onClick={(e) => e.stopPropagation()}>

                {/* Icon */}
                <div className='flex justify-center mb-4'>
                    <div className='bg-red-100 rounded-full p-3 text-3xl'>
                        🗑️
                    </div>
                </div>

                {/* Text */}
                <h2 className='text-lg font-bold text-gray-800 text-center mb-2'>
                    Delete Note?
                </h2>
                <p className='text-sm text-gray-500 text-center mb-6'>
                    Are you sure you want to delete
                    <span className='font-semibold text-gray-700'> "{noteTitle}"</span>?
                    This cannot be undone.
                </p>

                {/* Buttons */}
                <div className='flex gap-3'>
                    <button
                        onClick={onCancel}
                        className='flex-1 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm hover:bg-gray-50 transition'>
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className='flex-1 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition'>
                        Yes, Delete
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ConfirmModal