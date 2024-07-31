'use client'

import Button from '@/components/button'
import ButtonGroup, { ButtonGroupPropsItems } from '@/components/button-group'
import { CirclePlus, MoveRight, RotateCcw, RotateCw } from 'lucide-react'
import { memo, useCallback } from 'react'

interface IProps {}

/**
 * 按钮组
 */
const items: ButtonGroupPropsItems[] = [
  { Icon: RotateCcw, label: 'Left', key: 'left' },
  { Icon: RotateCw, label: 'Right', key: 'right' }
]

const Control: React.FC<IProps> = () => {
  const handleClick = useCallback((key: string) => {
    console.log(key)
  }, [])

  return (
    <div className="flex-center-i justify-between px-4 py-2 border-b border-zinc-200">
      <div className="flex-center-i gap-2">
        <Button Icon={CirclePlus} variant="line">
          Add
        </Button>
        {/* 旋转pdf */}
        <ButtonGroup items={items} onClick={handleClick} variant="line" disabled />
      </div>

      {/* 导出按钮 */}
      <Button className="w-56">
        <span>Finish</span>
        <MoveRight strokeWidth={1} />
      </Button>
    </div>
  )
}

export default memo(Control)
