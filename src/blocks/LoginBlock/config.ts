import type { Block } from 'payload'

export const LoginBlock: Block = {
  slug: 'loginBlock',
  interfaceName: 'LoginBlock',
  labels: {
    singular: 'Login Block',
    plural: 'Login Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Login to your account',
      label: 'Title',
      admin: {
        description: 'The title displayed above the login form',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Optional description text below the title',
      },
    },
  ],
}
