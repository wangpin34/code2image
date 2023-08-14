import React from 'react'

export type Language = 'javascript' | 'typescript' | 'css' | 'html' | 'sass' | 'scss' | 'less' | 'python' | 'ruby' | 'swift' | 'dart' | 'java' | 'go'

interface ValueContextType {
  language?: Language
  fontSize: number
}

interface SetterContextType {
  setLanguage: (language?: Language) => void
  setFontSize: (fontSize: number) => void
}



const ValueContext = React.createContext<ValueContextType>({fontSize: 15})
const SetterContext = React.createContext<SetterContextType>({setLanguage: () => null, setFontSize: () => null})

export function ValueProvider({value, children}: {value: ValueContextType, children: JSX.Element}) {
  return <ValueContext.Provider value={value}>{children}</ValueContext.Provider>
}

export function SetterProvider({value, children}: {value: SetterContextType, children: JSX.Element}) {
  return <SetterContext.Provider value={value}>{children}</SetterContext.Provider>
}

export function useLanguage() {
  const valueContext = React.useContext(ValueContext)
  if (valueContext === undefined) {
    throw new Error('useLanguage must be used within a Provider')
  }
  return valueContext.language
}

export function useFontSize() {
  const valueContext = React.useContext(ValueContext)
  if (valueContext === undefined) {
    throw new Error('useFontSize must be used within a Provider')
  }
  return valueContext.fontSize
}

export function useSetLanuage() {
  const setterContext = React.useContext(SetterContext)
  if (setterContext === undefined) {
    throw new Error('useLanguage must be used within a Provider')
  }
  return setterContext.setLanguage
}

export function useSetFontSize() {
  const setterContext = React.useContext(SetterContext)
  if (setterContext === undefined) {
    throw new Error('useFontSize must be used within a Provider')
  }
  return setterContext.setFontSize
}