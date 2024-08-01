import { Copy, RotateCw, ZoomIn, Trash } from 'lucide-react'
import { Dispatch, memo, SetStateAction, useCallback, useRef, useState } from 'react'
import ListThumbnail from './list-thumbnail'
import ButtonGroup, { ButtonGroupPropsItems } from '@/components/button-group'

interface IProps {
  index: number
  name: string
  rotate?: number
  onRotate?: (index: number, angle: number) => void
  onPreview?: (index: number) => void
  onDelete?: (index: number) => void
}

export interface ListThumbnailRef {
  rotatePDF: () => void
}

/**
 * 右上角按钮组
 */
const buttonGroupItems: ButtonGroupPropsItems[] = [
  { key: 'preview', Icon: ZoomIn, title: 'Preview' },
  { key: 'rotate', Icon: RotateCw, title: 'Rotate' },
  { key: 'copy', Icon: Copy, title: 'Copy' },
  { key: 'delete', Icon: Trash, title: 'Delete' }
]

const PDFViewItem: React.FC<IProps> = ({
  index,
  name,
  rotate = 0,
  onRotate,
  onPreview,
  onDelete
}) => {
  //ref
  const rotateRef = useRef(rotate)
  const indexRef = useRef(index)
  rotateRef.current = rotate
  indexRef.current = index

  /**
   * 旋转事件
   */
  const rotateFn = useCallback(() => {
    onRotate && onRotate(indexRef.current, (rotateRef.current + 90) % 360)
  }, [onRotate])

  /**
   * 点击按钮组
   */
  const handleGroupClick = useCallback(
    (key: string) => {
      switch (key) {
        case 'preview':
          // 打开预览
          onPreview && onPreview(indexRef.current)
          break
        case 'rotate':
          rotateFn()
          break
        case 'copy':
          break
        case 'delete':
          onDelete && onDelete(indexRef.current)
          break
      }
    },
    [onPreview, rotateFn]
  )

  return (
    <div className="flex-center flex-col gap-2 group/item hover:bg-[#D9E5FF] w-40 h-60 select-none relative">
      {/* pdf浏览 */}
      <ListThumbnail pageNumber={index + 1} rotate={rotate} onRotate={rotateFn} />

      {/* 名称 */}
      <span
        className="text-[#66242f] bg-[#ff59754d] px-2 rounded-sm max-w-24 truncate cursor-default"
        title={name}
      >
        {name}
      </span>

      {/* 下标 */}
      <span className="text-zinc-400">{index + 1}</span>

      {/* 按钮组 */}
      <ButtonGroup
        className="absolute invisible group-hover/item:visible right-1 top-1 bg-white h-7"
        variant="line"
        buttonClassName="p-1"
        items={buttonGroupItems}
        onClick={handleGroupClick}
      />
    </div>
  )
}

export default memo(PDFViewItem)
