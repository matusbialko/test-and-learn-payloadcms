import type { Block } from 'payload'

export const UserDetailsBlock: Block = {
  slug: 'userDetailsBlock',
  interfaceName: 'UserDetailsBlock',
  labels: {
    singular: 'User Details Block',
    plural: 'User Details Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'User Details',
      label: 'Title',
      admin: {
        description: 'The title displayed above the user details section',
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
