import { createBrowserRouter, RouterProvider } from "react-router-dom"
import io from "socket.io-client"

//pages imports
import Welcome from "./pages/Welcome"
import Room from "./pages/Room"
import { useState } from "react"

const App = () => {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [socket, setSocket] = useState(null)

  const router = createBrowserRouter([
    { path: "/", element: <Welcome username={username} setUsername={setUsername} room={room} setRoom={setRoom} setSocket={setSocket} /> },
    { path: "/chat", element: <Room username={username} room={room} socket={socket} /> }
  ])

  return (
    <RouterProvider router={router}>App</RouterProvider>
  )
}

export default App
