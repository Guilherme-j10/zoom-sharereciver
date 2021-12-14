import React, { useEffect, useRef } from 'react';
import { ContainerContent, GlobalStyle } from './GlobalStyle';
import { io } from 'socket.io-client';
import Peer from 'peerjs';

const SocketConnection = io('https://zoomsocket.cloudcall.tec.br/peerConnection', { transports: ['websocket'] });

function App() {

  const StreamInstance = useRef<MediaStream>({} as MediaStream);

  const peerInstance = new Peer({
    host: 'zoombk.cloudcall.tec.br',
    port: 3234,
    secure: true,
    path: '/peerAplication',
    debug: 3,
    config: {
      iceServers: [
        { urls: 'turn:34.69.41.255:3478?transport=tcp', credential: 'false', username: 'megaconecta:m364c0n3c74' },
        { urls: 'turn:34.69.41.255:3478?transport=udp', credential: 'false', username: 'megaconecta:m364c0n3c74' }
      ]
    }
  });

  useEffect(() => {
    peerInstance.on('open', (id) => {
      SocketConnection.emit('main_peer', id);
    });

    peerInstance.on('call', (call) => {

      if(Object.keys(StreamInstance.current).length){
        call.answer(StreamInstance.current);
        call.on('stream', (remoteStream: MediaStream) => {
          createVideoElement(remoteStream);
        })

        return;
      }

      navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream: MediaStream) => {
        StreamInstance.current = stream;
  
        call.answer(stream);
        call.on('stream', (remoteStream: MediaStream) => {
          createVideoElement(remoteStream);
        })
      });
      
    });
  }, []);

  const createVideoElement = (stream: MediaStream) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', stream.id);
    const Container = document.getElementById('Container');
    const VideoElement = document.createElement('video');
    VideoElement.srcObject = stream;
    VideoElement.autoplay = true;

    Container!.appendChild(VideoElement);
  }

  // navigator.mediaDevices.getDisplayMedia({
  //   video: true
  // }).then((stream: MediaStream) => {

  //   //setStream(stream);

  //   peerInstance.on('call', (call) => {
  //     call.answer(stream);
  //     call.on('stream', (remoteStream: MediaStream) => {
  //       console.log(remoteStream);
  //       const Container = document.getElementById('Container');
  //       const VideoElement = document.createElement('video');
  //       VideoElement.srcObject = remoteStream;
  //       VideoElement.autoplay = true;
  
  //       Container!.appendChild(VideoElement);
  //     })
  //   });
  // })

  // peerInstance.on('call', (call) => {
  //   call.answer(Stream);
  //   call.on('stream', (remoteStream: MediaStream) => {
  //     console.log(remoteStream);
  //     const Container = document.getElementById('Container');
  //     const VideoElement = document.createElement('video');
  //     VideoElement.srcObject = remoteStream;
  //     VideoElement.autoplay = true;

  //     Container!.appendChild(VideoElement);
  //   })
  //   // if(Object.keys(Stream).length){
  //   //   call.answer(Stream);
  //   //   call.on('stream', (remoteStream: MediaStream) => {
  //   //     console.log(remoteStream);
  //   //     const Container = document.getElementById('Container');
  //   //     const VideoElement = document.createElement('video');
  //   //     VideoElement.srcObject = remoteStream;
  //   //     VideoElement.autoplay = true;

  //   //     Container!.appendChild(VideoElement);
  //   //   })

  //   //   return;
  //   // }

  //   // navigator.mediaDevices.getDisplayMedia({
  //   //   video: true
  //   // }).then((stream: MediaStream) => {
  //   //   setStream(stream);

  //   //   call.answer(stream);
  //   //   call.on('stream', (remoteStream: MediaStream) => {
  //   //     console.log(remoteStream);
  //   //     const Container = document.getElementById('Container');
  //   //     const VideoElement = document.createElement('video');
  //   //     VideoElement.srcObject = remoteStream;
  //   //     VideoElement.autoplay = true;

  //   //     Container!.appendChild(VideoElement);
  //   //   })
  //   // });
  //   // call.answer(stream);
  //   // call.on('stream', (remoteStream: MediaStream) => {
  //   //   console.log(remoteStream);
  //   //   const Container = document.getElementById('Container');
  //   //   const VideoElement = document.createElement('video');
  //   //   VideoElement.srcObject = remoteStream;
  //   //   VideoElement.autoplay = true;

  //   //   Container!.appendChild(VideoElement);
  //   // })
  // })

  return (
    <>
      <GlobalStyle />
      <ContainerContent id="Container"></ContainerContent>
    </>
  );
}

export default App;
