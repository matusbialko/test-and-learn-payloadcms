import type { Block } from 'payload'

export const TodoListBlock: Block = {
    slug: 'todoListBlock',
    interfaceName: 'TodoListBlock',
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Todo List Title',
            defaultValue: 'My Todo List',
        },
        {
            name: 'todos',
            type: 'array',
            label: 'Todo Items',
            minRows: 1,
            fields: [
                {
                    name: 'text',
                    type: 'text',
                    label: 'Todo Text',
                    required: true,
                },
                {
                    name: 'completed',
                    type: 'checkbox',
                    label: 'Completed',
                    defaultValue: false,
                },
            ],
            admin: {
                initCollapsed: false,
                components: {
                    label: 'Todo items',
                },
            },
        },
    ],
    labels: {
        plural: 'Todo List Blocks',
        singular: 'Todo List Block',
    },
}