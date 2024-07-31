import { PDFFile } from '@/types'
import { memo, useState } from 'react'
import { Document, Page } from 'react-pdf'

import type { PDFDocumentProxy } from 'pdfjs-dist'

export interface TagProps {
  file: PDFFile
  name: string
}

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/'
}

const PDFView: React.FC<TagProps> = ({ file, name }) => {
  const [numPages, setNumPages] = useState<number>()

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages)
  }

  return (
    <Document
      file={file}
      onLoadSuccess={onDocumentLoadSuccess}
      options={options}
      className="flex gap-5 text-xs"
    >
      {Array.from(new Array(numPages), (_, index) => (
        <div key={`page_${index + 1}`} className="flex-center flex-col gap-2">
          {/* pdf浏览 */}
          <Page pageNumber={index + 1} width={120} />

          {/* 名称 */}
          <span className="text-[#66242f] bg-[#ff59754d] px-2 rounded-sm">{name}</span>

          {/* 下标 */}
          <span className="text-zinc-400">{index + 1}</span>
        </div>
      ))}
    </Document>
  )
}

export default memo(PDFView)
