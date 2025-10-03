'use client'
import React, { useEffect } from 'react'

export type HubSpotContactFormBlockType = {
  blockName?: string
  blockType?: 'hubspotContactFormBlock'
  enableIntro: boolean
  introContent?: string
  formType: 'form-1' | 'form-2' | 'form-3'
}

export const HubSpotContactFormBlock: React.FC<
  {
    id?: string
  } & HubSpotContactFormBlockType
> = (props) => {
  const { enableIntro, introContent, formType } = props

  // Hardcoded form configurations
  const formConfigs = {
    'form-1': {
      formId: '1205f5a0-0aab-45d3-a7bf-00f36b1dbf8a',
      portalId: '147000058',
      region: 'eu1',
    },
    'form-2': {
      formId: 'form-2-id-here',
      portalId: '147000058',
      region: 'eu1',
    },
    'form-3': {
      formId: 'form-3-id-here',
      portalId: '147000058',
      region: 'eu1',
    },
  }

  const currentForm = formConfigs[formType]

  useEffect(() => {
    // Load HubSpot form script
    const script = document.createElement('script')
    script.src = `https://js-${currentForm.region}.hsforms.net/forms/embed/${currentForm.portalId}.js`
    script.defer = true
    document.head.appendChild(script)
  }, [currentForm.region, currentForm.portalId])

  return (
    <div className="container lg:max-w-[48rem]">
      {enableIntro && introContent && (
        <div
          className="mb-8 lg:mb-12 prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: introContent }}
        />
      )}

      <div className="p-4 lg:p-6 border border-border rounded-[0.8rem]">
        <div
          className="hs-form-frame"
          data-region={currentForm.region}
          data-form-id={currentForm.formId}
          data-portal-id={currentForm.portalId}
        />
      </div>
    </div>
  )
}
