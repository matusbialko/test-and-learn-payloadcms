import React from 'react'
import { cn } from '@/utilities/ui'

interface TodoItemProps {
    text: string
    completed: boolean
}

export const TodoItem: React.FC<TodoItemProps> = ({ text, completed }) => {
  return (
        <div className="flex items-center space-x-3 py-2">
            <div className="flex-shrink-0">
                <input
                    type="checkbox"
                    title={`${text} checkbox`}
                    checked={completed}
                    readOnly
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
            </div>
            <span
                className={cn(
                    'flex-1 text-gray-900',
                    completed && 'text-orange-500'
                )}
            >
                {text}
            </span>
        </div>
    )
}