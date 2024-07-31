'use client'

import ButtonGroup, { ButtonGroupPropsItems } from '@/components/button-group'
import { ChevronDown, PlusCircle, UploadCloud } from 'lucide-react'
import { memo } from 'react'

interface IProps {}

const items: ButtonGroupPropsItems[] = [
  { Icon: PlusCircle, label: <span className="font-bold">Select Files</span>, key: 'select' },
  { Icon: ChevronDown, key: 'down' }
]

const Select: React.FC<IProps> = () => {
  const handleClick = () => {
    console.log(123)
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
      <div>
        <span>Supported formats:</span>
      </div>
    </div>
  )
}

export default memo(Select)
