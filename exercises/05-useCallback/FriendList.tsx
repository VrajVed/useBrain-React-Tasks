import { useState, memo, useRef } from 'react'

type Friend = {
  id: number
  name: string
}

function FriendItem({ friend, onRemove }: { friend: Friend; onRemove: (id: number) => void }) {
  const renders = useRef(0)
  renders.current += 1

  return (
    <li data-testid={`friend-${friend.id}`}>
      {friend.name} (renders: {renders.current})
      <button data-testid={`remove-${friend.id}`} onClick={() => onRemove(friend.id)}>
        Remove
      </button>
    </li>
  )
}

const MemoFriendItem = memo(FriendItem)

export default function FriendList({ initialFriends }: { initialFriends: Friend[] }) {
  const [friends, setFriends] = useState(initialFriends)

  const removeFriend = (id: number) => {
    setFriends(prev => prev.filter(f => f.id !== id))
  }

  return (
    <ul>
      {friends.map(f => (
        <MemoFriendItem key={f.id} friend={f} onRemove={removeFriend} />
      ))}
    </ul>
  )
}
