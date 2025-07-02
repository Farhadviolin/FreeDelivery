import React, { useEffect, useState } from 'react';

type Post = { id: string; type: string; content: any };

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch('/feed/recent').then(r => r.json()).then(setPosts);
    const ws = new WebSocket('wss://api.delivery.com/ws/feed');
    ws.onmessage = e => setPosts(prev => [JSON.parse(e.data), ...prev]);
  }, []);
  return (
    <div>
      {posts.map(p => (
        <div key={p.id}><strong>{p.type}</strong>: {JSON.stringify(p.content)}</div>
      ))}
    </div>
  );
}
