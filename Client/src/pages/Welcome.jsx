import { useNavigate } from 'react-router-dom'
import io from "socket.io-client"

const Welcome = ({ username, setUsername, room, setRoom, setSocket }) => {
    const navigate = useNavigate();

    const joinRoom = (e) => {
        e.preventDefault();
        if (username.trim().length > 0 && room.trim().length > 0 && room !== "select-room") {
            const socket = io.connect(import.meta.env.VITE_SERVER)
            setSocket(socket)
            navigate("/chat", { replace: true })
        } else {
            alert("Fill all user info.")
        }
    }

    return (
        <section className='w-full h-screen flex items-center justify-center'>
            <div className='w-1/2 bg-gray-50 p-10 rounded-lg'>
                <h2 className='text-5xl font-bold text-center text-blue-500 mb-6'>Rooms.io</h2>
                <form onSubmit={joinRoom}>
                    <div className='mb-3'>
                        <input type="text" placeholder='username ...' id='username' className='w-full border-2 border-blue-500 outline-none p-2.5 rounded-lg text-base font-medium' onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <select name="room" id="room" className='w-full block border-2 border-blue-500 text-black text-base text-center font-medium rounded-lg p-2.5  focus:ring-blue-500' onChange={e => setRoom(e.target.value)}>
                            <option value="select-room">-- Select Room --</option>
                            <option value="react">React</option>
                            <option value="express">Express</option>
                        </select>
                    </div>
                    <button type='submit' className='w-full text-center text-base text-white bg-blue-500 py-2.5 rounded-lg font-medium'>Join Room</button>
                </form>
            </div>
        </section>
    )
}

export default Welcome