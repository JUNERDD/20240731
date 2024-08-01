'use client'

import { ChevronLeft, ChevronRight, RotateCcw, RotateCw, Trash, X } from 'lucide-react'
import { memo, MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Button from '@/components/button'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import { Thumbnail } from 'react-pdf'
import ButtonGroup, { ButtonGroupPropsItems } from '@/components/button-group'
import { ElEvent } from '@/types'

interface IProps {
  open: boolean
  num: number
  numPages: number
  rotateList: number[]
  onRotate?: (index: number, angle: number) => void
  setOpen?: (show: boolean) => void
  setNum?: (num: number) => void
}

const ThumbnailFull: React.FC<IProps> = ({
  open,
  num,
  numPages,
  rotateList,
  onRotate,
  setOpen,
  setNum
}) => {
  //内部数字
  const [boxNum, setBoxNum] = useState(num)

  //旋转角度
  const [rotate, setRotate] = useState(0)

  /**
   * 关闭
   */
  const handleClose = useCallback(() => {
    setOpen && setOpen(false)
  }, [setOpen])

  /**
   * 更改数字
   */
  const handleInputNum = (e: ElEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (boxNum <= numPages) {
      setNum && setNum(boxNum)
    } else {
      setBoxNum(numPages)
      setNum && setNum(numPages)
    }
  }

  const numRef = useRef(num)
  numRef.current = num

  useEffect(() => {
    setBoxNum(numRef.current)
  }, [open])

  //控制器数组
  const items = useMemo<ButtonGroupPropsItems[]>(
    () => [
      { Icon: ChevronLeft, key: 'prev', title: 'Previous' },
      {
        key: 'num',
        render: () => (
          <div className="bg-white h-full border-y border-r flex-center gap-2 px-6 border-middle-gray">
            <form onSubmit={handleInputNum} onBlur={handleInputNum}>
              <input
                title="page number"
                className="w-8 h-8 bg-[#F4F4F4] outline-none text-center"
                value={boxNum}
                onChange={({ target: { value } }) => setBoxNum(Number(value) ? Number(value) : 1)}
              />
            </form>

            <span> / </span>
            <span>{numPages}</span>
          </div>
        )
      },
      { Icon: ChevronRight, key: 'next', title: 'Next' },
      { Icon: RotateCcw, key: 'rotate left', title: 'Rotate Left' },
      { Icon: RotateCw, key: 'rotate right', title: 'Rotate Right' },
      { Icon: Trash, key: 'delete', title: 'Delete' }
    ],
    [boxNum, numPages, setBoxNum, handleInputNum]
  )

  /**
   * 控制器点击
   */
  const handleClick = useCallback(
    (key: string) => {
      switch (key) {
        case 'prev': {
          const newNum = numRef.current > 1 ? numRef.current - 1 : numPages
          setBoxNum(newNum)
          setNum && setNum(newNum)
          break
        }
        case 'next': {
          const newNum = numRef.current < numPages ? numRef.current + 1 : 1
          setBoxNum(newNum)
          setNum && setNum(newNum)
          break
        }
        case 'rotate left':
          setRotate((prevRotation) => (prevRotation - 90) % 360)
          break
        case 'rotate right':
          setRotate((prevRotation) => (prevRotation + 90) % 360)
          break
        case 'delete':
          break
      }
    },
    [numPages, setNum, setRotate]
  )

  //更新父组件的值
  const openRef = useRef(open)
  openRef.current = open
  useEffect(() => {
    openRef.current && onRotate && onRotate(numRef.current - 1, rotate)
  }, [rotate])

  return createPortal(
    <div className={cn('fixed top-0 bottom-0 left-0 right-0', open ? 'flex-center' : 'hidden')}>
      {/* 遮罩 */}
      <div className="absolute w-full h-full bg-[rgba(0,0,0,0.5)]" onClick={handleClose} />

      {/* 关闭按钮 */}
      <Button Icon={X} variant="line" className="absolute top-4 right-4" onClick={handleClose} />

      {/* 浏览 */}
      <Thumbnail
        pageNumber={numRef.current}
        width={550}
        rotate={rotateList[num - 1]}
        className="relative cursor-default"
      />

      {/* 控制 */}
      <ButtonGroup
        items={items}
        variant="line"
        icon
        className="absolute bottom-8 mx-auto"
        onClick={handleClick}
      />
    </div>,
    document.body
  )
}

export default memo(ThumbnailFull)
