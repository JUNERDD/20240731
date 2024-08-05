import { PlusCircle } from 'lucide-react'
import { memo } from 'react'

interface IProps {
  onSelect?: () => void
}

const Last: React.FC<IProps> = ({ onSelect }) => {
  const handleClick = () => {
    onSelect && onSelect()
  }

  return (
    <div
      className="flex-center h-60 w-40 cursor-pointer select-none flex-col gap-4 rounded-[4px] border border-dashed border-sky-500 text-[#6699ff] transition duration-500 hover:bg-[#D9E5FF]"
      onClick={handleClick}
    >
      {/* 图标 */}
      <PlusCircle strokeWidth={1} />

      {/* 说明 */}
      <p className="flex-center w-2/3 flex-wrap gap-1">
        <span>Add</span>
        <strong>PDF, </strong>
        <strong>image, Word, </strong>
        <strong>Excel,</strong>
        <span>and</span>
        <strong>PowerPoint</strong>
        <span>files</span>
      </p>
    </div>
  )
}

export default memo(Last)
