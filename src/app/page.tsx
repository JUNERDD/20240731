'use client'

import AppHeader from '@/components/app-header'
import Control from './_cpn/control'
import PdfLogo from '@/assets/svg/pdf-logo'
import Select from './_cpn/select'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { useCallback, useRef, useState } from 'react'
import { ElChange, PDFFile } from '@/types'
import PdfView from '@/components/pdf-view'
import { cn } from '@/lib/utils'

// 配置
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

export default function Home() {
  //文件对象
  const [file, setFile] = useState<PDFFile>('sample.pdf')

  //文件名
  const [fileName, setFileName] = useState<string>('sample.pdf')

  //文件选择器ref
  const inputRef = useRef<HTMLInputElement | null>(null)

  //文件更改事件
  const handleFileChange: ElChange<HTMLInputElement> = ({ target }) => {
    const { files } = target

    const nextFile = files?.[0]

    if (nextFile) {
      setFile(nextFile)
    }
  }

  //打开文件选择对话框
  const handleSelect = useCallback(() => {
    inputRef.current?.click()
  }, [])

  return (
    <main className="w-full flex flex-col">
      {/* header */}
      <AppHeader label="Rotate" />

      {/* control */}
      <Control />

      {/* main */}
      <div
        className={cn(
          'bg-[#F2F6FF] flex-center flex-col gap-4 h-full overflow-auto p-8',
          file && 'justify-start items-start'
        )}
      >
        {/* 选择文件 */}
        {file ? <PdfView file={file} name={fileName} /> : <Select onSelect={handleSelect} />}

        {/* pdf logo */}
        {!file && (
          <div className="w-24 h-8 overflow-hidden text-[#D9DFED]">
            <PdfLogo />
          </div>
        )}
      </div>

      {/* 文件选择器 */}
      <input
        ref={inputRef}
        onChange={handleFileChange}
        hidden
        type="file"
        title="文件选择器"
        accept="image/jpeg,.jpg,.jpeg,.jfif,image/gif,.gif,image/bmp,.bmp,image/png,.png,image/tiff,.tif,.tiff,image/heic,.heic,image/webp,.webp,application/pdf,.pdf,application/msword,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx,application/vnd.ms-powerpoint,.ppt,application/vnd.openxmlformats-officedocument.presentationml.presentation,.pptx,application/vnd.ms-excel,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.xlsx"
      />
    </main>
  )
}
