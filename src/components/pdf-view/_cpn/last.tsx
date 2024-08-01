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
      className="w-40 h-60 flex-center flex-col text-[#6699ff] gap-4 hover:bg-[#D9E5FF] rounded-[4px] cursor-pointer transition duration-500 border-dashed border border-sky-500 select-none"
      onClick={handleClick}
    >
      {/* 图标 */}
      <PlusCircle strokeWidth={1} />

      {/* 说明 */}
      <p className="flex-center gap-1 flex-wrap w-2/3">
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
