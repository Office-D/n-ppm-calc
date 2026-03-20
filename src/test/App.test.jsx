import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('App', () => {
  it('初期表示でタイトルが表示される', () => {
    render(<App />)
    expect(screen.getByText('窒素濃度 ppm 計算')).toBeInTheDocument()
  })

  it('計算タブがデフォルトで表示される', () => {
    render(<App />)
    expect(screen.getByPlaceholderText('233.5')).toBeInTheDocument()
  })

  it('作物目安タブに切り替えできる', async () => {
    render(<App />)
    await userEvent.click(screen.getByText('作物目安'))
    expect(screen.getByText('ナス')).toBeInTheDocument()
    expect(screen.getByText('トマト')).toBeInTheDocument()
  })

  it('使い方タブに切り替えできる', async () => {
    render(<App />)
    await userEvent.click(screen.getByText('使い方'))
    expect(screen.getByText('ppmとは？')).toBeInTheDocument()
  })

  it('ppm算出モードで計算結果が表示される', async () => {
    render(<App />)
    const nInput = screen.getByPlaceholderText('233.5')
    const wInput = screen.getByPlaceholderText('4000')
    await userEvent.type(nInput, '400')
    await userEvent.type(wInput, '4000')
    expect(screen.getByText('100.0')).toBeInTheDocument()
  })
})
