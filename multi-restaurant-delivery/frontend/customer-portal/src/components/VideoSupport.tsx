import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Device } from 'mediasoup-client';

export function VideoSupport({ roomId }: { roomId: string }) {
  const localVid = useRef<HTMLVideoElement>(null);
  const remoteVid = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const socket = io('https://signal.delivery.com');
    socket.emit('join-room', { roomId });

    async function initMedia() {
      const device = new Device();
      // load router RTP capabilities via signaling
      // create sendTransport, recvTransport, produce, consume...
      // attach streams to video elements
    }
    initMedia();
  }, [roomId]);

  return (
    <div className="video-support">
      <video ref={localVid} autoPlay muted className="self-view"/>
      <video ref={remoteVid} autoPlay className="remote-view"/>
    </div>
  );
}
