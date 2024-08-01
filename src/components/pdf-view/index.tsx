import { PDFFile } from '@/types'
import { Fragment, memo, useCallback, useState } from 'react'
import { Document } from 'react-pdf'

import type { PDFDocumentProxy } from 'pdfjs-dist'
import { PlusCircle } from 'lucide-react'
import Last from './_cpn/last'
import Item from './_cpn/item'
import Full from './_cpn/full'
import { createPortal } from 'react-dom'

export interface TagProps {
  file: PDFFile
  name: string
}

/**
 * pdf选项
 */
const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/'
}

const PDFView: React.FC<TagProps> = ({ file, name }) => {
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

  return (
    <Document
      file={file}
      onLoadSuccess={onDocumentLoadSuccess}
      options={options}
      className="pdf-view-list flex gap-2 text-xs"
      onItemClick={() => {}}
    >
      {Array.from(new Array(numPages), (_, index) => (
        <Fragment key={`page_${index + 1}`}>
          <Item index={index} name={name} onPreview={handlePreview} />

          {/* 添加按钮 */}
          <div className="flex-center group/item hover:cursor-pointer" title="Adds Documents">
            <PlusCircle className="fill-[#D9E5FF] stroke-white group-hover/item:fill-[#0055FF]" />
          </div>
        </Fragment>
      ))}

      {/* 最后添加按钮 */}
      <Last />

      {/* 浏览窗口 */}
      <Full
        open={isShowFull}
        setOpen={setIsShowFull}
        num={num}
        numPages={numPages}
        setNum={setNum}
      />
    </Document>
  )
}

export default memo(PDFView)
