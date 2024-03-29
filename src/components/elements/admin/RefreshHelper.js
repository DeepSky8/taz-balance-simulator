import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, onValue, ref } from "firebase/database";
import { auth, db } from "../../../firebase/firebase";
import { startRemoveUser } from "../../../actions/userActions";

export const RefreshHelper = ({ }) => {
    let navigate = useNavigate()
    const [commandCode, setCommandCode] = useState('')
    const [adminCode, setAdminCode] = useState('')

    useEffect(() => {
        return onValue(ref(db, 'users/' + auth.currentUser.uid + '/adminCode'),
            (snapshot) => {
                if (snapshot.exists()) {
                    setAdminCode(snapshot.val())
                }
            })
    }, [])

    const refreshAccounts = () => {
        const today = new Date().getTime()
        const tenDays = (10 * 24 * 60 * 60 * 1000)
        const tenDaysAgo = today - tenDays
        get(ref(db, 'users'))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const refreshArray = []
                    snapshot.forEach(user => {
                        if (user.val().isAnonymous === true &&
                            (user.val().lastActivity < tenDaysAgo
                                || user.val().lastActivity === undefined
                            )) {
                            refreshArray.push(user.val())
                        }
                    })
                    refreshArray.forEach((user) => { startRemoveUser(user.uid) })
                }
            })

    }

    const checkCommandCode = (e) => {
        e.preventDefault();
        if (commandCode === adminCode) {
            setCommandCode('')
            refreshAccounts()
        } else {
            navigate('/')
        }
    }


    return (
        <div>
            Refresh Page
            <form onSubmit={checkCommandCode}>
                <input type='text'
                    onChange={
                        (e) => { setCommandCode(e.target.value.toString()) }
                    }
                />
                <button>Refresh</button>
            </form>
        </div>
    )
}

