import { UserRound } from 'lucide-react'
import { memo } from 'react'

interface IProps {
  label: string
}

const AppHeader: React.FC<IProps> = ({ label }) => {
  return (
    <header className="flex-center-i justify-between px-4 py-2 border-b border-zinc-200">
      <h2>{label}</h2>

      <button
        type="button"
        title="user"
        className="flex-center-i gap-2 border px-3 py-2 hover:bg-middle-gray transition duration-500 rounded-[3px]"
      >
        <UserRound strokeWidth={0.5} size={17} />
        <span className="text-sm">Log in</span>
      </button>
    </header>
  )
}

export default memo(AppHeader)
