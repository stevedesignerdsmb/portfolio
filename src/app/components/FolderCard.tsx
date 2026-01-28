'use client'

import { useState, useMemo } from 'react'
import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { CldImage } from '@/lib/cloudinary'
import * as StatusBadge from './ui/status-badge'
import * as Badge from './ui/badge'
import { RiWindowFill, RiGooglePlayFill, RiAppleFill } from '@remixicon/react'

// Rauno-style easing
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
const TRANSITION_DURATION = 0.3

interface ImagePosition {
  x: number
  rotate: number
}

interface FolderCardProps {
  /** Title displayed on the card */
  title: string
  /** Array of image URLs for the stacked cards (Cloudinary public IDs) */
  images: string[]
  /** Platform string to display */
  platform?: string
  /** Tags to display as badges (max 3) */
  tags?: string[]
  /** Whether to show Coming Soon badge */
  comingSoon?: boolean
  /** Card width in pixels */
  width?: number
  /** Callback when card is clicked */
  onClick?: () => void
  /** Callback when card is hovered */
  onHover?: (isHovered: boolean) => void
}

export function FolderCard({
  title,
  images,
  platform,
  tags = [],
  comingSoon = false,
  width = 288,
  onClick,
  onHover,
}: FolderCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const imagePositions = useMemo<ImagePosition[]>(() => {
    const count = 5
    const positions: ImagePosition[] = []
    const totalSpread = 160
    const step = count > 1 ? totalSpread / (count - 1) : 0
    const startX = -totalSpread / 2

    for (let i = 0; i < count; i++) {
      const x = count > 1 ? startX + step * i : 0
      const normalizedPos = count > 1 ? (i / (count - 1)) * 2 - 1 : 0
      const rotate = normalizedPos * 10
      positions.push({ x, rotate })
    }
    return positions
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover?.(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onHover?.(false)
  }

  // Parse platform string to get icons - always Apple first, then Android, then Web
  const platformIcons = useMemo(() => {
    if (!platform) return []
    const icons: ComponentType<{ className?: string }>[] = []
    const platformLower = platform.toLowerCase()
    
    // Always add Apple/iOS first if present
    if (platformLower.includes('ios') || platformLower.includes('apple')) {
      icons.push(RiAppleFill)
    }
    // Then Android
    if (platformLower.includes('android')) {
      icons.push(RiGooglePlayFill)
    }
    // Finally Web
    if (platformLower.includes('web')) {
      icons.push(RiWindowFill)
    }
    
    return icons
  }, [platform])

  return (
    <div
      className="group relative"
      style={{
        width,
        perspective: '1200px',
        zIndex: isHovered ? 50 : 1,
        cursor: comingSoon ? 'default' : 'pointer',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={comingSoon ? undefined : onClick}
    >
      <div className="relative" style={{ width, perspective: '1200px' }}>
        {/* Back panel */}
        <motion.div
          className="relative z-0 rounded-[1.25rem]"
          animate={{
            rotateX: isHovered ? 15 : 0,
            backgroundColor: isHovered ? 'var(--color-bg-weak-50)' : 'var(--color-bg-soft-200)',
          }}
          transition={{
            rotateX: {
              type: 'spring',
              stiffness: 200,
              damping: 25,
              mass: 0.8,
            },
            backgroundColor: {
              duration: TRANSITION_DURATION,
              ease: EASE_OUT_EXPO,
            },
          }}
          style={{
            height: '224px',
            border: '1px solid var(--color-stroke-soft-200)',
            transformStyle: 'preserve-3d',
            transformOrigin: 'center bottom',
            boxShadow: isHovered
              ? 'var(--shadow-regular-md)'
              : 'var(--shadow-regular-xs)',
          }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              rotateX: isHovered ? -15 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 25,
              mass: 0.8,
            }}
            style={{
              transformStyle: 'flat',
              transformOrigin: 'center bottom',
            }}
          >
            {[...Array(5)].map((_, imgIndex) => {
              const pos = imagePositions[imgIndex]
              const imageUrl = images[imgIndex % images.length] || images[0] || ''

              const centerIndex = 2
              const distanceFromCenter = Math.abs(imgIndex - centerIndex)
              const zIndex = 10 - distanceFromCenter
              const isCenterImage = imgIndex === centerIndex

              const brightness = distanceFromCenter === 0 ? 1 : distanceFromCenter === 1 ? 0.85 : 0.7
              const blurAmount = distanceFromCenter === 0 ? 0 : distanceFromCenter === 1 ? 0.5 : 1.5
              const yOffset = -16 * (1 - distanceFromCenter / centerIndex) || 0
              const scale = distanceFromCenter === 0 ? 1.05 : distanceFromCenter === 1 ? 0.95 : 0.88

              const xPos = isHovered ? pos.x * 1.4 : pos.x
              const yPos = isHovered ? -8 + yOffset : 8 + yOffset
              const rotation = isHovered ? pos.rotate * 1.3 : pos.rotate
              const finalScale = isHovered ? scale * 1.02 : scale

              const staggerDelay = distanceFromCenter * 0.08

              return (
                <motion.div
                  key={imgIndex}
                  className="absolute left-1/2 top-0"
                  initial={false}
                  animate={{
                    x: `calc(-50% + ${xPos}px)`,
                    y: yPos,
                    rotate: rotation,
                    scale: finalScale,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 16,
                    mass: 1,
                    delay: staggerDelay,
                  }}
                  style={{ zIndex }}
                >
                  {/* Coming Soon badge above center image */}
                  {isCenterImage && comingSoon && (
                    <motion.div
                      className="absolute -top-8 left-1/2 -translate-x-1/2 z-20"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <StatusBadge.Root status="pending" variant="stroke">
                        <StatusBadge.Dot />
                        Coming Soon
                      </StatusBadge.Root>
                    </motion.div>
                  )}
                  <motion.div
                    className="overflow-hidden rounded-[0.625rem]"
                    animate={{
                      filter: `brightness(${isHovered ? Math.min(1, brightness + 0.1) : brightness}) contrast(1.05) saturate(${1 - distanceFromCenter * 0.15}) blur(${isHovered ? 0 : blurAmount}px)`,
                    }}
                    transition={{
                      duration: TRANSITION_DURATION,
                      ease: EASE_OUT_EXPO,
                    }}
                    style={{
                      height: '160px',
                      width: '100px',
                      boxShadow: 'var(--shadow-regular-sm)',
                    }}
                  >
                    {imageUrl && (
                      <CldImage
                        src={imageUrl}
                        alt={`Preview ${imgIndex + 1}`}
                        width={100}
                        height={160}
                        className="h-full w-full object-cover"
                        priority={imgIndex === 2}
                      />
                    )}
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Front panel */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 rounded-[1.25rem] overflow-hidden"
          animate={{
            rotateX: isHovered ? -25 : 0,
            backgroundColor: isHovered
              ? 'var(--color-bg-white-0)'
              : 'rgba(255, 255, 255, 0.9)',
          }}
          transition={{
            rotateX: {
              type: 'spring',
              stiffness: 180,
              damping: 22,
              mass: 0.8,
            },
            backgroundColor: {
              duration: TRANSITION_DURATION,
              ease: EASE_OUT_EXPO,
            },
          }}
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--color-stroke-soft-200)',
            transformStyle: 'preserve-3d',
            transformOrigin: 'center bottom',
            boxShadow: 'var(--shadow-regular-xs)',
          }}
        >
          <div className="relative py-4 px-4">
            <div className="flex items-start justify-between gap-2">
              <h3
                className="font-medium text-base leading-snug line-clamp-2 min-h-[2.75rem] transition-colors duration-300 flex-1"
                style={{
                  color: isHovered ? 'var(--color-text-strong-950)' : 'var(--color-text-sub-600)',
                }}
              >
                {title}
              </h3>
              {platformIcons.length > 0 && (
                <div className="flex items-center gap-1.5 flex-shrink-0 pt-1">
                  {platformIcons.map((Icon, index) => (
                    <Icon
                      key={index}
                      className="w-4 h-4"
                      style={{ color: 'var(--color-text-soft-400)' }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="relative h-[48px]">
            {/* Top border */}
            <div
              className="absolute inset-x-0 top-0 h-[1px]"
              style={{ backgroundColor: 'var(--color-stroke-soft-200)' }}
            />

            {/* Footer content */}
            <div className="absolute inset-0 flex items-center px-4">
              <div className="flex items-center gap-1.5 flex-wrap">
                {tags.slice(0, 3).map((tag, index) => (
                  <Badge.Root
                    key={index}
                    variant="lighter"
                    size="medium"
                    color="gray"
                  >
                    {tag}
                  </Badge.Root>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
