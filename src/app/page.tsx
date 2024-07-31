import AppHeader from '@/components/app-header'
import Control from './_cpn/control'
import PdfLogo from '@/assets/svg/pdf-logo'
import Select from './_cpn/select'

export default function Home() {
  return (
    <main className="w-full flex flex-col">
      {/* header */}
      <AppHeader label="Rotate" />

      {/* control */}
      <Control />

      {/* main */}
      <div className="bg-[#F2F6FF] flex-center flex-col gap-4 h-full p-8">
        {/* 选择文件 */}
        <Select />

        {/* pdf logo */}
        <div className="w-24 h-8 overflow-hidden text-[#D9DFED]">
          <PdfLogo />
        </div>
      </div>
    </main>
  )
}
