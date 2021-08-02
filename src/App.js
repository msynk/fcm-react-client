import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { getToken, onMessage } from './firebase';
import { Button, Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [show, setShow] = useState(false);
  const [tokenFound, setTokenFound] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });

  useEffect(() => {
    window.navigator.serviceWorker.register('sw.js', { scope: '/tt' })

    async function start() {
      try {
        const token = await getToken()
        console.log(token)
        setTokenFound(!!token)
      } catch (error) {
        console.error(error)
      }

      onMessage().then(async payload => {
        setShow(true);
        setNotification({ title: payload.notification.title, body: payload.notification.body })
        console.log(payload);

        try {
          const token = await getToken()
          console.log(token)
          setTokenFound(!!token)
        } catch (error) {
          console.error(error)
        }

      }).catch(err => console.log('failed: ', err));
    }

    start()

  }, []);


  return (
    <div className="App">
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
        position: 'absolute',
        top: 20,
        right: 20,
        minWidth: 200
      }}>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded mr-2"
            alt=""
          />
          <strong className="mr-auto">{notification.title}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
      <header className="App-header">
        {tokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!tokenFound && <h1> Need notification permission ❗️ </h1>}
        <img src={logo} className="App-logo" alt="logo" />
        <Button onClick={() => setShow(true)}>Show Toast</Button>
      </header>


    </div>
  );
}

export default App;