'use client'

import AppHeader from '@/components/app-header'
import Control from './_cpn/control'
import PdfLogo from '@/assets/svg/pdf-logo'
import Select from './_cpn/select'
import { pdfjs, Document, Page } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { useState } from 'react'
import { PDFFile } from '@/types'
import PdfView from '@/components/pdf-view'

// 配置
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

export default function Home() {
  const [file, setFile] = useState<PDFFile>(null)

  return (
    <main className="w-full flex flex-col">
      {/* header */}
      <AppHeader label="Rotate" />

      {/* control */}
      <Control />

      {/* main */}
      <div className="bg-[#F2F6FF] flex-center flex-col gap-4 h-full p-8">
        {/* 选择文件 */}
        {file ? <PdfView /> : <Select />}

        {/* pdf logo */}
        <div className="w-24 h-8 overflow-hidden text-[#D9DFED]">
          <PdfLogo />
        </div>
      </div>
    </main>
  )
}
