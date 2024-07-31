import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from '@/utils/color'
import { memo } from 'react'

export interface TagProps {
  label: string
  color: string
  backgroundColor: string
}

const Tag: React.FC<TagProps> = ({ label, color, backgroundColor }) => {
  return (
    <span
      className="rounded-full text-xs py-[0.2rem] px-2 font-bold"
      style={{ color, backgroundColor }}
    >
      {label}
    </span>
  )
}

export default memo(Tag)
