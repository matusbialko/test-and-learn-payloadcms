import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ExampleBlock } from '@/blocks/ExampleBlock/Component'
import { ChartBlock } from '@/blocks/ChartBlock.tsx/Component'
import { LoginBlock } from '@/blocks/LoginBlock/Component'
import { RegisterBlock } from '@/blocks/RegisterBlock/Component'
import { UserDetailsBlock } from '@/blocks/UserDetailsBlock/Component'
import { TodoListBlock } from './TodoListBlock/Component'
import { HeroBlock } from '@/blocks/HeroBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  exampleBlock: ExampleBlock,
  chartBlock: ChartBlock,
  loginBlock: LoginBlock,
  registerBlock: RegisterBlock,
  userDetailsBlock: UserDetailsBlock,
  todoListBlock: TodoListBlock,
  heroBlock: HeroBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              // Special handling for HeroBlock as first block
              const isFirstBlock = index === 0
              const isHeroBlock = blockType === 'heroBlock'
              const marginClass = isFirstBlock && isHeroBlock ? 'mb-16' : 'my-16'

              return (
                <div className={marginClass} key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
