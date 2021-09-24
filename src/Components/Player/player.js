import './player.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import ProgressBar from './../ProgressBar/ProgressBar.js'
import { render } from '@testing-library/react';

function Player(props) {
  const playerId = React.useRef(null);
  const playerContainer = React.useRef(null);
  const directory = React.useRef(null);
  const [playerSwitch, setSwitch] = useState(true);
  const [controlBar, setControlBar] = useState(false);

  // Total Duration of video
  const duration = playerId.current ? playerId.current.duration : 0;
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration - minutes * 60);

  // Current time of video
  const [crntDuration, setDuration] = useState(playerId.current ? playerId.current.currentTime : 0);
  const crntMinute = Math.floor(crntDuration / 60);
  const crntSec = Math.floor(crntDuration - crntMinute * 60);

  // Volume part of player
  const [sound, setSound] = useState(100);

  // const [volumeOption, setVolumeOption] = useState(false);

  // Fullscreen Option
  const [fullscreen, setFullscreen] = useState(false);
  // after video completes, restarting the video
  const [restart, setRestart] = useState(false);

  // source of the video
  const [vidSrc, setVidSrc] = useState(props.src);

  // to change the time on the video player
  useEffect(() => {
    const interval = setInterval(() => {
      const temp = playerId.current ? playerId.current.currentTime : 0;
      setDuration(temp)
      if (playerId.current.ended) {
        setRestart(true);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [restart]);

  const play = () => {
    playerId.current.play()
    setSwitch(!playerSwitch)
  }

  const playAgain = () => {
    playerId.current.play();
    setSwitch(false)
    setRestart(false);
  }

  const pause = () => {
    playerId.current.pause();
    setSwitch(!playerSwitch)
  }

  const changeTime = (value) => {
    playerId.current.currentTime = value;
  }

  const changeVolume = (volume) => {
    playerId.current.volume = volume / 100;
    setSound(volume);
  }

  const fullscreenHandler = () => {
    if (!fullscreen) {
      if (playerContainer.current.requestFullscreen) {
        playerContainer.current.requestFullscreen();
      } else if (playerContainer.current.webkitRequestFullscreen) { /* Safari */
        playerContainer.current.webkitRequestFullscreen();
      } else if (playerContainer.current.msRequestFullscreen) { /* IE11 */
        playerContainer.current.msRequestFullscreen();
      }
    }
    else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
    }
    setFullscreen(!fullscreen)
  }

  const directoryHandler = (event) => {
    const file = event.target.files[0];
    const blobURL = URL.createObjectURL(file);
    pause();
    setVidSrc(blobURL)
    playerId.current.load()

  }

  return (
    <React.Fragment>
      <div
        className="vidArea"
        ref={playerContainer}
        onMouseEnter={() => setControlBar(!controlBar)}
        onMouseLeave={() => setControlBar(!controlBar)}
      >
        <video ref={playerId} className="vidDisplay cursor" onClick={() => { restart ? playAgain() : playerSwitch ? play() : pause() }}>
          <source src={vidSrc} type="video/mp4" />
        </video>

        {/* Control bar area */}
        {controlBar ?
          <Container fluid className="ControlOptions p-2" style={{ backgroundColor: props.primaryColor + props.opacity }}>
            <Row>
              <Col md="3">
                <Row>
                  <Col md="2">
                    {restart ?
                      <i className="fas fa-undo-alt fs-4 cursor text-light" onClick={() => playAgain()}></i>
                      : playerSwitch ?
                        <i className="fas fa-play fs-4 cursor text-light" onClick={() => play()}></i>
                        :
                        <i className="fas fa-pause fs-4 cursor text-light" onClick={() => pause()}></i>
                    }
                  </Col>
                  <Col md="" className="text-center text-light fw-light">
                    {minutes}: {seconds} / {crntMinute}: {crntSec}
                  </Col>
                  <Col md="4">
                    <Row>
                      <Col md="6">
                        <i className="fas fa-backward fs-4 text-light cursor" onClick={() => changeTime(crntDuration - 10)}></i>
                      </Col>
                      <Col md="">
                        <i className="fas fa-forward fs-4 text-light cursor" onClick={() => changeTime(crntDuration + 10)}></i>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col md="">
                <ProgressBar total={duration} current={crntDuration} changeDuration={(value) => changeTime(value)} />
              </Col>
              <Col md="3">
                <Row>
                  <Col md="2">
                    <Input type="file" innerRef={directory} onChange={(e) => directoryHandler(e)} hidden />
                    <i className="fas fa-folder fs-4 text-light cursor" onClick={() => directory.current.click()}></i>
                  </Col>
                  <Col md="2">
                    {sound ?
                      <i className="fas fa-volume-up fs-4 cursor text-light" onClick={() => changeVolume(0)}></i>
                      :
                      <i class="fas fa-volume-mute fs-4 cursor text-light" onClick={() => changeVolume(100)}></i>
                    }
                  </Col>
                  <Col md="">
                    <ProgressBar total={100} current={sound} changeDuration={(value) => changeVolume(value)} />
                  </Col>
                  <Col md="2">
                    {!fullscreen ?
                      <i className="fas fa-expand fs-4 cursor text-light" onClick={() => fullscreenHandler()}></i>
                      :
                      <i className="fas fa-compress fs-4 cursor text-light" onClick={() => fullscreenHandler()}></i>
                    }
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          : null}
      </div>
    </React.Fragment >
  );
}

export default Player;
