import ButtonGroup, { ButtonGroupPropsItems } from '@/components/button-group'
import Tag, { TagProps } from '@/components/tag'
import { ChevronDown, PlusCircle, UploadCloud } from 'lucide-react'
import { memo } from 'react'

interface IProps {
  onSelect?: () => void
}

/**
 * 按钮组
 */
const items: ButtonGroupPropsItems[] = [
  { Icon: PlusCircle, label: <span className="font-bold">Select Files</span>, key: 'select' },
  { Icon: ChevronDown, key: 'down' }
]

/**
 * tag
 */
const tags: TagProps[] = [
  { label: 'PDF', color: '#911d1d', backgroundColor: '#fcd6d6' },
  { label: 'DOC', color: '#255c93', backgroundColor: '#d8ebfd' },
  { label: 'XLS', color: '#007a29', backgroundColor: '#ccf5da' },
  { label: 'PPT', color: '#994d00', backgroundColor: '#ffe6cc' },
  { label: 'PNG', color: '#996e00', backgroundColor: '#fff1cc' },
  { label: 'JPG', color: '#994d00', backgroundColor: '#ffe6cc' }
]

const Select: React.FC<IProps> = ({ onSelect }) => {
  const handleClick = () => {
    onSelect && onSelect()
  }

  return (
    <div
      className="w-full h-full bg-[#E5EEFF] flex-center flex-col gap-4 hover:bg-[#D9E5FF] rounded-[4px] cursor-pointer transition duration-500 border-dashed border border-sky-500 select-none"
      onClick={handleClick}
    >
      {/* 图标 */}
      <UploadCloud size={60} strokeWidth={1} />

      {/* 上传按钮 */}
      <ButtonGroup items={items} />

      {/* 说明 */}
      <p className="flex-center-i gap-2">
        <span>Add</span>
        <strong>PDF, image, Word, Excel,</strong>
        <span>and</span>
        <strong>PowerPoint</strong>
        <span>files</span>
      </p>
      <div className="flex-center-i gap-2">
        <span>Supported formats:</span>
        {/* tag组 */}
        {tags.map((item) => (
          <Tag key={item.label} {...item} />
        ))}
      </div>
    </div>
  )
}

export default memo(Select)
