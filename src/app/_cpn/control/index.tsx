'use client'

import Button from '@/components/button'
import ButtonGroup, { ButtonGroupPropsItems } from '@/components/button-group'
import { CirclePlus, MoveRight, RotateCcw, RotateCw } from 'lucide-react'
import { Dispatch, memo, SetStateAction, useCallback } from 'react'

interface IProps {
  disabled: boolean
  setRotateList: Dispatch<SetStateAction<number[]>>
  onSelect?: (index?: number) => void
}

/**
 * 按钮组
 */
const items: ButtonGroupPropsItems[] = [
  { Icon: RotateCcw, label: 'Left', key: 'left', title: 'Rotate Left' },
  { Icon: RotateCw, label: 'Right', key: 'right', title: 'Rotate Right' }
]

const Control: React.FC<IProps> = ({ disabled, setRotateList, onSelect }) => {
  const handleClick = useCallback((key: string) => {
    switch (key) {
      case 'left':
        setRotateList((prev) => prev.map((item) => item + 90))
        break
      case 'right':
        setRotateList((prev) => prev.map((item) => item - 90))
        break
    }
  }, [])

  //增加文件
  const handleAdd = useCallback(() => {
    onSelect && onSelect()
  }, [onSelect])

  return (
    <div className="flex-center-i justify-between px-4 py-2 border-b border-zinc-200">
      <div className="flex-center-i gap-2">
        <Button Icon={CirclePlus} variant="line" title="Add Document" onClick={handleAdd}>
          Add
        </Button>
        {/* 旋转pdf */}
        <ButtonGroup items={items} onClick={handleClick} variant="line" disabled={disabled} />
      </div>

      {/* 导出按钮 */}
      <Button className="w-56" disabled={disabled}>
        <span>Finish</span>
        <MoveRight strokeWidth={1} />
      </Button>
    </div>
  )
}

export default memo(Control)
