import React from 'react'
import { HandHelping, Users, Zap, Shield, Star, Heart } from 'lucide-react'

import type { HeroBlock as HeroBlockType } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { Hero45 } from '@/heros/Hero45'

// Icon mapping for Hero45 features
const iconMap = {
  handHelping: HandHelping,
  users: Users,
  zap: Zap,
  shield: Shield,
  star: Star,
  heart: Heart,
}

interface HeroBlockProps extends HeroBlockType {
  disableInnerContainer?: boolean
}

export const HeroBlock: React.FC<HeroBlockProps> = (props) => {
  const { heroType, richText, media, badge, heading, features, disableInnerContainer } = props

  // For Hero45, we need to transform the features data
  const hero45Features = features?.map((feature) => {
    const IconComponent = iconMap[feature.icon as keyof typeof iconMap]
    return {
      icon: <IconComponent className="h-auto w-5" />,
      title: feature.title,
      description: feature.description,
    }
  })

  // Create hero props based on type
  const heroProps = {
    richText,
    media,
    ...(heroType === 'hero45' && {
      badge: badge || 'shadcnblocks.com',
      heading: heading || 'Blocks built with Shadcn & Tailwind',
      features: hero45Features || [
        {
          icon: <HandHelping className="h-auto w-5" />,
          title: 'Flexible Support',
          description:
            'Benefit from around-the-clock assistance to keep your business running smoothly.',
        },
        {
          icon: <Users className="h-auto w-5" />,
          title: 'Collaborative Tools',
          description:
            'Enhance teamwork with tools designed to simplify project management and communication.',
        },
        {
          icon: <Zap className="h-auto w-5" />,
          title: 'Lightning Fast Speed',
          description: 'Experience the fastest load times with our high performance servers.',
        },
      ],
    }),
  }

  // Render the appropriate hero component
  const renderHero = () => {
    switch (heroType) {
      case 'highImpact':
        return <HighImpactHero {...heroProps} />
      case 'mediumImpact':
        return <MediumImpactHero {...heroProps} />
      case 'lowImpact':
        return <LowImpactHero {...heroProps} />
      case 'hero45':
        return <Hero45 {...heroProps} />
      default:
        return null
    }
  }

  if (disableInnerContainer) {
    return renderHero()
  }

  return renderHero()
}
