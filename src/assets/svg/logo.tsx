import { memo } from 'react'

interface IProps {}

const Logo: React.FC<IProps> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none">
      <path
        fill="#FF46FB"
        fillRule="evenodd"
        d="M27 27h13v9a4 4 0 0 1-4 4h-9z"
        clipRule="evenodd"
      ></path>
      <path fill="#CA41FC" fillRule="evenodd" d="M13 27h14v13H13z" clipRule="evenodd"></path>
      <path
        fill="#8B48FE"
        fillRule="evenodd"
        d="M0 27h13v13H4a4 4 0 0 1-4-4z"
        clipRule="evenodd"
      ></path>
      <path fill="#81E650" fillRule="evenodd" d="M40 13H27v14h13z" clipRule="evenodd"></path>
      <path fill="#00D267" fillRule="evenodd" d="M27 13H13v14h14z" clipRule="evenodd"></path>
      <path fill="#00C0FF" fillRule="evenodd" d="M13 13H0v14h13z" clipRule="evenodd"></path>
      <path
        fill="#FFD200"
        fillRule="evenodd"
        d="M27 0h9a4 4 0 0 1 4 4v9H27z"
        clipRule="evenodd"
      ></path>
      <path fill="#FF8E00" fillRule="evenodd" d="M13 0h14v13H13z" clipRule="evenodd"></path>
      <path
        fill="#FF5400"
        fillRule="evenodd"
        d="M0 4a4 4 0 0 1 4-4h9v13H0z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

export default memo(Logo)
