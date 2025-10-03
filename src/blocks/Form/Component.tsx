'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
  useHubSpot?: boolean
  hubspotForm?: 'contact' | 'newsletter' | 'support'
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    useHubSpot,
    hubspotForm,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          // Submit to PayloadCMS
          const payloadReq = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const payloadRes = await payloadReq.json()

          // If HubSpot integration is enabled, also submit to HubSpot
          if (useHubSpot && hubspotForm) {
            try {
              // Hardcoded HubSpot form configurations
              const hubspotConfigs = {
                contact: {
                  formId: '1205f5a0-0aab-45d3-a7bf-00f36b1dbf8a',
                  portalId: '147000058',
                  region: 'eu1',
                },
                newsletter: {
                  formId: 'newsletter-form-id-here',
                  portalId: '147000058',
                  region: 'eu1',
                },
                support: {
                  formId: 'support-form-id-here',
                  portalId: '147000058',
                  region: 'eu1',
                },
              }

              const config = hubspotConfigs[hubspotForm]
              if (config) {
                // Generate endpoint
                const endpoint = `https://forms-${config.region}.hsforms.com/submissions/v3/public/submit/formsnext/multipart/${config.portalId}/${config.formId}`

                // Convert data to HubSpot format
                const hubspotData = new FormData()
                Object.entries(data).forEach(([name, value], index) => {
                  hubspotData.append(`0-1/${name}`, String(value))
                })

                // Add hs_context with required HubSpot metadata
                const hsContext = {
                  source: 'forms-embed-static',
                  sourceName: 'forms-embed',
                  sourceVersion: '1.0',
                  sourceVersionMajor: '1',
                  sourceVersionMinor: '0',
                  referrer: window.location.href,
                  userAgent: navigator.userAgent,
                  urlParams: {
                    _hsPortalId: config.portalId,
                    _hsFormId: config.formId,
                    _hsIsQa: 'false',
                    _hsHublet: config.region,
                    _hsDisableScriptloader: 'true',
                    _hsDisableRedirect: 'true',
                    _hsInstanceId: 'aa59fd93-2700-4312-aa68-26b586a57d89',
                  },
                  isHubSpotCmsGeneratedPage: false,
                  isCMSEditor: false,
                  locale: 'en',
                  formDefinitionUpdatedAt: Date.now(),
                  pageUrl: window.location.href,
                  pageTitle: document.title,
                  pageId: null,
                  allPageIds: {},
                  fieldValues: Object.fromEntries(
                    Object.entries(data).map(([name, value]) => [`0-1/${name}`, String(value)]),
                  ),
                  emailResubscribeStatus: 'NOT_APPLICABLE',
                  captchaStatus: 'NOT_APPLICABLE',
                  renderedFieldsIds: Object.keys(data).map((name) => `0-1/${name}`),
                  boolCheckBoxFields: '',
                  formId: config.formId,
                  portalId: parseInt(config.portalId),
                  region: config.region,
                  env: 'prod',
                }

                hubspotData.append('hs_context', JSON.stringify(hsContext))

                const hubspotReq = await fetch(endpoint, {
                  method: 'POST',
                  body: hubspotData,
                })

                if (!hubspotReq.ok) {
                  console.warn('HubSpot submission failed:', hubspotReq.status)
                }
              }
            } catch (hubspotErr) {
              console.warn('HubSpot submission error:', hubspotErr)
            }
          }

          clearTimeout(loadingTimerID)

          if (payloadReq.status >= 400) {
            setIsLoading(false)

            setError({
              message: payloadRes.errors?.[0]?.message || 'Internal Server Error',
              status: payloadRes.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType, useHubSpot, hubspotForm],
  )

  return (
    <div className="container lg:max-w-[48rem]">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className="p-4 lg:p-6 border border-border rounded-[0.8rem]">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText data={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 last:mb-0">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
              </div>

              <Button form={formID} type="submit" variant="default">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
