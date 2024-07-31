import AppNav from '@/components/app-nav'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNav />
      {children}
    </>
  )
}
