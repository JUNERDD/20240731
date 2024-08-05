import { memo } from 'react'

export interface TagProps {
  label: string
  color: string
  backgroundColor: string
}

const Tag: React.FC<TagProps> = ({ label, color, backgroundColor }) => {
  return (
    <span className="rounded-full px-2 py-[0.2rem] text-xs font-bold" style={{ color, backgroundColor }}>
      {label}
    </span>
  )
}

export default memo(Tag)
