import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'heroBlock',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero Block',
    plural: 'Hero Blocks',
  },
  fields: [
    {
      name: 'heroType',
      type: 'select',
      defaultValue: 'hero45',
      label: 'Hero Type',
      required: true,
      options: [
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Hero 45',
          value: 'hero45',
        },
      ],
    },
    {
      name: 'richText',
      type: 'richText',
      label: 'Content',
      admin: {
        condition: (_, { heroType } = {}) => heroType !== 'hero45',
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, { heroType } = {}) =>
          ['highImpact', 'mediumImpact', 'hero45'].includes(heroType),
      },
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
      admin: {
        condition: (_, { heroType } = {}) => heroType === 'hero45',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      admin: {
        condition: (_, { heroType } = {}) => heroType === 'hero45',
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      admin: {
        condition: (_, { heroType } = {}) => heroType === 'hero45',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          required: true,
          options: [
            { label: 'Hand Helping', value: 'handHelping' },
            { label: 'Users', value: 'users' },
            { label: 'Zap', value: 'zap' },
            { label: 'Shield', value: 'shield' },
            { label: 'Star', value: 'star' },
            { label: 'Heart', value: 'heart' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
      ],
    },
  ],
}
