import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'useHubSpot',
      type: 'checkbox',
      label: 'Use HubSpot Integration',
      defaultValue: false,
      admin: {
        description: 'Enable HubSpot form submission alongside PayloadCMS',
      },
    },
    {
      name: 'hubspotForm',
      type: 'select',
      options: [
        { label: 'Contact Form (firstname, lastname, email)', value: 'contact' },
        { label: 'Newsletter Form', value: 'newsletter' },
        { label: 'Support Form', value: 'support' },
      ],
      admin: {
        condition: (_, { useHubSpot }) => Boolean(useHubSpot),
        description: 'Select which HubSpot form to submit data to',
      },
      label: 'HubSpot Form',
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block',
  },
}
