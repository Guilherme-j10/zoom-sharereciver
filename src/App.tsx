import React, { useEffect } from 'react';
import { ContainerContent, GlobalStyle } from './GlobalStyle';
import { io } from 'socket.io-client';
import Peer from 'peerjs';

const SocketConnection = io('http://localhost:3234/peerConnection', { transports: ['websocket'] });

function App() {

  const peerInstance = new Peer();

  useEffect(() => {
    peerInstance.on('open', (id) => {
      SocketConnection.emit('main_peer', id);
    })

    peerInstance.on('call', (call) => {
      navigator.mediaDevices.getDisplayMedia({
        video: true
      }).then((stream: MediaStream) => {
        call.answer(stream);
        call.on('stream', (remoteStream: MediaStream) => {
          const Container = document.getElementById('Container');
          const VideoElement = document.createElement('video');
          VideoElement.srcObject = remoteStream;
          VideoElement.autoplay = true;

          Container!.appendChild(VideoElement);
        })
      });
    })
  }, []); 

  return (
    <>
      <GlobalStyle />
      <ContainerContent id="Container"></ContainerContent>
    </>
  );
}

export default App;
