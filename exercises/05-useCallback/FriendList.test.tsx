import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import FriendList from './FriendList'

describe('FriendList', () => {
  it('removes a friend when clicked', async () => {
    render(
      <FriendList
        initialFriends={[
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
        ]}
      />,
    )

    const removeAlice = screen.getByTestId('remove-1')
    await userEvent.click(removeAlice)
    expect(screen.queryByTestId('friend-1')).not.toBeInTheDocument()
    expect(screen.getByTestId('friend-2')).toBeInTheDocument()
  })

  it('does not re-render surviving friends', async () => {
    render(
      <FriendList
        initialFriends={[
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
        ]}
      />,
    )

    expect(screen.getByTestId('friend-2')).toHaveTextContent('renders: 1')
    const removeAlice = screen.getByTestId('remove-1')
    await userEvent.click(removeAlice)
    expect(screen.getByTestId('friend-2')).toHaveTextContent('renders: 1')
  })
})
