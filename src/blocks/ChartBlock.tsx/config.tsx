import type { Block } from 'payload'

export const ChartBlock: Block = {
  slug: 'chartBlock',
  interfaceName: 'ChartBlock',
  labels: {
    singular: 'Chart Block',
    plural: 'Chart Blocks',
  },
  fields: [
    {
      name: 'chartText',
      type: 'text',
      required: false,
      label: 'Chart Text',
      admin: {
        description: 'Enter some chart text to display in this block',
      },
    },
  ],
}