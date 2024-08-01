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
import { PDFDocument } from 'pdf-lib'

// 配置
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

export default function Home() {
  //文件对象
  const [file, setFile] = useState<PDFFile>(null)

  //文件名
  const [fileName, setFileName] = useState<string>('')

  //文件选择器ref
  const inputRef = useRef<HTMLInputElement | null>(null)

  //判断是否是增加
  const [isAdd, setIsAdd] = useState(true)

  //旋转数组
  const [rotateList, setRotateList] = useState<number[]>([])

  //更改pdf
  async function addPdf(nextFile: File, index: number) {
    //增加
    const existingPdfBytes =
      file instanceof Blob
        ? await file.arrayBuffer()
        : await fetch(file as string).then((res) => res.arrayBuffer())
    const newPdfBytes = await nextFile.arrayBuffer()

    const existingPdfDoc = await PDFDocument.load(existingPdfBytes)
    const newPdfDoc = await PDFDocument.load(newPdfBytes)

    const copiedPages = await existingPdfDoc.copyPages(newPdfDoc, newPdfDoc.getPageIndices())

    //判断是否是追加
    copiedPages.forEach((page, idx) => {
      if (index === -1) {
        existingPdfDoc.addPage(page)
      } else {
        existingPdfDoc.insertPage(index + idx + 1, page)
      }
    })

    const mergedPdfBytes = await existingPdfDoc.save()
    const mergedPdfBlob = new Blob([mergedPdfBytes], { type: 'application/pdf' })
    const mergedPdfUrl = URL.createObjectURL(mergedPdfBlob)

    setFile(mergedPdfUrl)
  }

  //文件更改事件
  const indexRef = useRef(0)
  const handleFileChange: ElChange<HTMLInputElement> = async ({ target }) => {
    const { files } = target

    const nextFile = files?.[0]

    if (nextFile) {
      if (isAdd) {
        await addPdf(nextFile, indexRef.current)
      } else {
        setFile(nextFile)
        setFileName(nextFile.name)
      }
    }
  }

  //打开文件选择对话框
  const handleSelectAdd = useCallback(
    (index = -1) => {
      indexRef.current = index
      setIsAdd(true)
      inputRef.current?.click()
    },
    [setIsAdd]
  )

  const handleSelectReplace = useCallback(() => {
    setIsAdd(false)
    inputRef.current?.click()
  }, [setIsAdd])

  return (
    <main className="w-full flex flex-col">
      {/* header */}
      <AppHeader label="Rotate" />

      {/* control */}
      <Control disabled={!file} setRotateList={setRotateList} onSelect={handleSelectAdd} />

      {/* main */}
      <div
        className={cn(
          'bg-[#F2F6FF] flex-center flex-col gap-4 h-full overflow-auto p-8',
          file && 'justify-start items-start py-8 px-6'
        )}
      >
        {/* 选择文件 */}
        {file ? (
          <PdfView
            file={file}
            name={fileName}
            onSelect={handleSelectAdd}
            rotateList={rotateList}
            setRotateList={setRotateList}
          />
        ) : (
          <Select onSelect={handleSelectReplace} />
        )}

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
