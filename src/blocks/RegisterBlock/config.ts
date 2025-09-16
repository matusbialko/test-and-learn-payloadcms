import type { Block } from 'payload'

export const RegisterBlock: Block = {
  slug: 'registerBlock',
  interfaceName: 'RegisterBlock',
  labels: {
    singular: 'Register Block',
    plural: 'Register Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Create your account',
      label: 'Title',
      admin: {
        description: 'The title displayed above the registration form',
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
