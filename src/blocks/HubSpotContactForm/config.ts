import type { Block } from 'payload'

export const HubSpotContactFormBlock: Block = {
  slug: 'hubspotContactFormBlock',
  interfaceName: 'HubSpotContactFormBlock',
  fields: [
    {
      name: 'formType',
      type: 'select',
      required: true,
      options: [
        { label: 'Form 1 - Contact Form', value: 'form-1' },
        { label: 'Form 2 - Newsletter', value: 'form-2' },
        { label: 'Form 3 - Support', value: 'form-3' },
      ],
      defaultValue: 'form-1',
      label: 'Select Form Type',
      admin: {
        description: 'Choose which HubSpot form to display',
      },
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
      defaultValue: false,
    },
    {
      name: 'introContent',
      type: 'textarea',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
        description: 'HTML content to display above the form',
      },
      label: 'Intro Content (HTML)',
    },
  ],
  graphQL: {
    singularName: 'HubSpotContactFormBlock',
  },
  labels: {
    plural: 'HubSpot Contact Form Blocks',
    singular: 'HubSpot Contact Form Block',
  },
}
