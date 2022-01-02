import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

type ApiKeyContextType = [
  string,
  Dispatch<SetStateAction<string>>
]

export const ApiKeyContext = createContext<ApiKeyContextType | null>(null)

const useApiKey = () => {
  const context = useContext(ApiKeyContext)
  if (context === null) {
    throw new Error()
  }
  return context
}

export default useApiKey
