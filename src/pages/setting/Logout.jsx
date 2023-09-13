import { signOut } from 'firebase/auth'
import Swal from 'sweetalert2'

import { auth } from '@config/firebase'

const Logout = () => {
    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Stay a bit longer! Your game data is securely saved, and there's more fun ahead. Keep the excitement going – we're here whenever you're ready to play again!",
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                localStorage.removeItem('hasSeenGuide')
                signOut(auth)
                Swal.fire({
                    text: 'Your game data has been saved. We look forward to seeing you again!',
                })
            }
        })
    }

    return <button onClick={handleLogout}>Logout</button>
}

export default Logout
