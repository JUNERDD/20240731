import { PDFFile } from '@/types'
import { Fragment, memo, useCallback, useRef, useState } from 'react'
import { Document, Thumbnail } from 'react-pdf'

import type { PDFDocumentProxy } from 'pdfjs-dist'
import { Copy, PlusCircle, RotateCw, Trash, ZoomIn } from 'lucide-react'
import Last from './_cpn/last'
import ButtonGroup, { ButtonGroupPropsItems } from '../button-group'
import ListThumbnail, { ListThumbnailRef } from './_cpn/list-thumbnail'
import Item from './_cpn/item'

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
  const [numPages, setNumPages] = useState<number>()

  /**
   * pdf加载成功
   */
  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages)
  }

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
          <Item index={index} name={name} />

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
