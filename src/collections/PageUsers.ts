import type { CollectionConfig } from 'payload'

export const PageUsers: CollectionConfig = {
    slug: 'page-users',
    auth: true,
    admin: {
        useAsTitle: 'email',
    },
    fields: [
        {
            name: 'username',
            type: 'text',
        },
        {
            name: 'profilePicture',
            type: 'upload',
            relationTo: 'media',
        }
    ],
}