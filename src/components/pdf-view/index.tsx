import { PDFFile } from '@/types'
import { Dispatch, Fragment, memo, SetStateAction, useCallback, useRef, useState } from 'react'
import { Document } from 'react-pdf'

import type { PDFDocumentProxy } from 'pdfjs-dist'
import { PlusCircle } from 'lucide-react'
import Last from './_cpn/last'
import Item from './_cpn/item'
import Full from './_cpn/full'

export interface TagProps {
  file: PDFFile
  name: string
  rotateList: number[]
  setRotateList: Dispatch<SetStateAction<number[]>>
  onSelect?: (index?: number) => void
  onCopy?: (index: number) => void
  onDelete?: (index: number) => void
}

/**
 * pdf选项
 */
const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/'
}

const PDFView: React.FC<TagProps> = ({
  file,
  name,
  rotateList,
  setRotateList,
  onSelect,
  onCopy,
  onDelete
}) => {
  //页码
  const [numPages, setNumPages] = useState(0)

  //是否显示全屏
  const [isShowFull, setIsShowFull] = useState(false)

  //当前页码
  const [num, setNum] = useState(1)

  /**
   * pdf加载成功
   */
  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages)
    setRotateList(new Array(nextNumPages).fill(0))
  }

  /**
   * 打开全屏浏览
   */
  const handlePreview = useCallback(
    (index: number) => {
      setNum(index + 1)
      setIsShowFull(true)
    },
    [setIsShowFull, setNum]
  )

  //监听旋转事件
  const rotateListRef = useRef(rotateList)
  rotateListRef.current = rotateList
  const handleRotate = useCallback(
    (index: number, angle: number) => {
      const list = [...rotateListRef.current]
      list[index] = angle
      setRotateList(list)
    },
    [setRotateList]
  )

  //增加文件
  const handleAdd = useCallback(
    (index?: number) => {
      onSelect && onSelect(index)
    },
    [onSelect]
  )

  return (
    <Document
      file={file}
      onLoadSuccess={onDocumentLoadSuccess}
      options={options}
      className="flex gap-2 text-xs flex-wrap"
      onItemClick={() => {}}
    >
      {Array.from(new Array(numPages), (_, index) => (
        <Fragment key={`page_${index + 1}`}>
          <Item
            index={index}
            name={name}
            rotate={rotateList[index]}
            onPreview={handlePreview}
            onRotate={handleRotate}
            onCopy={onCopy}
            onDelete={onDelete}
          />

          {/* 添加按钮 */}
          <div
            className="flex-center group/item hover:cursor-pointer"
            title="Adds Documents"
            onClick={() => handleAdd(index)}
          >
            <PlusCircle className="fill-[#D9E5FF] stroke-white group-hover/item:fill-[#0055FF]" />
          </div>
        </Fragment>
      ))}

      {/* 最后添加按钮 */}
      <Last onSelect={handleAdd} />

      {/* 浏览窗口 */}
      <Full
        open={isShowFull}
        setOpen={setIsShowFull}
        num={num}
        numPages={numPages}
        rotateList={rotateList}
        setNum={setNum}
        onRotate={handleRotate}
        onDelete={onDelete}
      />
    </Document>
  )
}

export default memo(PDFView)
