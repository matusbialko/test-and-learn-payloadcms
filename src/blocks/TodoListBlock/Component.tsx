import React from 'react'
import { TodoItem } from './TodoItem/Component'
import type { TodoListBlock as TodoListBlockProps } from '@/payload-types'

export const TodoListBlock: React.FC<TodoListBlockProps> = (props) => {
  const { title, todos } = props

  return (
    <div className="container my-16">
        <div className="max-w-2xl mx-auto">
            {title && (
                <h2 className="text-2xl font-bold text-white mb-6">
                    {title}
                </h2>
            )}
            
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="p-6">
                    {todos && todos.length > 0 ? (
                        <div className="space-y-1">
                            {todos.map((todo, index) => (
                                <TodoItem
                                    key={index}
                                    text={todo.text || ''}
                                    completed={Boolean(todo.completed)}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-4">
                            No todo items yet. Add some in the admin panel.
                        </p>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}