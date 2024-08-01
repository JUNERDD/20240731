import { PDFFile } from '@/types'
import { Fragment, memo, useCallback, useState } from 'react'
import { Document, Thumbnail } from 'react-pdf'

import type { PDFDocumentProxy } from 'pdfjs-dist'
import { Copy, PlusCircle, RotateCw, Trash, ZoomIn } from 'lucide-react'
import Last from './_cpn/last'
import ButtonGroup, { ButtonGroupPropsItems } from '../button-group'

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

/**
 * 右上角按钮组
 */
const buttonGroupItems: ButtonGroupPropsItems[] = [
  { key: 'preview', Icon: ZoomIn, title: 'Preview' },
  { key: 'rotate', Icon: RotateCw, title: 'Rotate' },
  { key: 'copy', Icon: Copy, title: 'Copy' },
  { key: 'delete', Icon: Trash, title: 'Delete' }
]

const PDFView: React.FC<TagProps> = ({ file, name }) => {
  const [numPages, setNumPages] = useState<number>()

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages)
  }

  /**
   * 点击按钮组
   */
  const handleGroupClick = useCallback((key: string) => {
    console.log(key)

    switch (key) {
      case 'preview':
        break
      case 'rotate':
        break
      case 'copy':
        break
      case 'delete':
        break
    }
  }, [])

  return (
    <Document
      file={file}
      onLoadSuccess={onDocumentLoadSuccess}
      options={options}
      className="pdf-view-list flex gap-5 text-xs"
      onItemClick={() => {}}
    >
      {Array.from(new Array(numPages), (_, index) => (
        <Fragment key={`page_${index + 1}`}>
          <div className="flex-center flex-col gap-2 group/item hover:bg-[#D9E5FF] w-40 h-60 select-none relative">
            {/* pdf浏览 */}
            <Thumbnail pageNumber={index + 1} width={120} className="relative cursor-default">
              {/* 旋转按钮 */}
              <div className="absolute flex-center top-0 right-0 left-0 bottom-0">
                <div
                  className="bg-white w-8 h-8 border border-primary rounded-full flex-center group-hover/item:bg-primary group-hover/item:border-none shadow-2xl drop-shadow-md cursor-pointer"
                  title="Rotate"
                >
                  <RotateCw size={14} className="stroke-primary group-hover/item:stroke-white" />
                </div>
              </div>
            </Thumbnail>

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

          {/* 添加按钮 */}
          <div className="flex-center group/item hover:cursor-pointer" title="Adds Documents">
            <PlusCircle className="fill-[#D9E5FF] stroke-white group-hover/item:fill-[#0055FF]" />
          </div>
        </Fragment>
      ))}

      {/* 最后添加按钮 */}
      <Last />
    </Document>
  )
}

export default memo(PDFView)
