import { UserRound } from 'lucide-react'
import { memo } from 'react'
import Button from '../button'

interface IProps {
  label: string
}

const AppHeader: React.FC<IProps> = ({ label }) => {
  return (
    <header className="flex-center-i justify-between border-b border-zinc-200 px-4 py-2">
      <h2>{label}</h2>

      <Button Icon={UserRound} variant="line">
        Log in
      </Button>
    </header>
  )
}

export default memo(AppHeader)
