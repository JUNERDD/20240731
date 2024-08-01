'use client'

import AppHeader from '@/components/app-header'
import Control from './_cpn/control'
import PdfLogo from '@/assets/svg/pdf-logo'
import Select from './_cpn/select'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { degrees, PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { useCallback, useRef, useState } from 'react'
import { ElChange, PDFFile } from '@/types'
import PdfView from '@/components/pdf-view'
import { cn } from '@/lib/utils'

// 配置
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

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

  //打开文件选择对话框
  const handleSelectAdd = useCallback(
    (index = -1) => {
      indexRef.current = index
      setIsAdd(true)
      inputRef.current?.click()
    },
    [setIsAdd]
  )

  //替换全部文件
  const handleSelectReplace = useCallback(() => {
    setIsAdd(false)
    inputRef.current?.click()
  }, [setIsAdd])

  //input文件更改事件
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

    //重置选择
    target.value = ''
  }

  //加载pdf
  async function loadPdf() {
    const existingPdfBytes =
      file instanceof Blob
        ? await file.arrayBuffer()
        : await fetch(file as string).then((res) => res.arrayBuffer())

    return await PDFDocument.load(existingPdfBytes)
  }

  //更新pdf
  async function updatePdf(doc: PDFDocument) {
    const newPdfBytes = await doc.save()
    const newPdfBlob = new Blob([newPdfBytes], { type: 'application/pdf' })
    const newPdfUrl = URL.createObjectURL(newPdfBlob)

    setFile(newPdfUrl)
  }

  //添加pdf
  async function addPdf(nextFile: File, index: number) {
    const existingPdfDoc = await loadPdf()
    const newPdfBytes = await nextFile.arrayBuffer()
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

    await updatePdf(existingPdfDoc)
  }

  //复制pdf
  const handleCopy = useCallback(
    async (index: number) => {
      if (file) {
        const existingPdfDoc = await loadPdf()
        const [copiedPage] = await existingPdfDoc.copyPages(existingPdfDoc, [index])
        existingPdfDoc.insertPage(index + 1, copiedPage)
        await updatePdf(existingPdfDoc)
      }
    },
    [file, loadPdf]
  )

  //删除pdf
  const handleDelete = useCallback(
    async (index: number) => {
      if (file) {
        const existingPdfDoc = await loadPdf()
        existingPdfDoc.removePage(index)
        await updatePdf(existingPdfDoc)
      }
    },
    [file]
  )

  //导出pdf
  const handleExport = useCallback(async () => {
    if (file) {
      const existingPdfDoc = await loadPdf()
      const pages = existingPdfDoc.getPages()

      //根据当前旋转角度进行旋转
      pages.forEach((page, index) => {
        page.setRotation(degrees(page.getRotation().angle + rotateList[index]))
      })

      const newPdfBytes = await existingPdfDoc.save()
      const newPdfBlob = new Blob([newPdfBytes], { type: 'application/pdf' })
      saveAs(newPdfBlob, fileName || 'document.pdf')
    }
  }, [file, rotateList, fileName])

  return (
    <main className="w-full flex flex-col">
      {/* header */}
      <AppHeader label="Rotate" />

      {/* control */}
      <Control
        disabled={!file}
        setRotateList={setRotateList}
        onSelect={file ? handleSelectAdd : handleSelectReplace}
        onFinish={handleExport}
      />

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
            onCopy={handleCopy}
            onDelete={handleDelete}
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
