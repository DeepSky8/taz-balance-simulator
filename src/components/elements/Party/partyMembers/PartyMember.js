import { off, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase/firebase";
import { charClassTitles, charTitles } from "../../../classes/charInfo";

export const PartyMember = ({ uid, charID, hostID }) => {
    const [charName, setCharName] = useState('')
    const [classCode, setClassCode] = useState('')
    const [questCount, setQuestCount] = useState('')
    // console.log('Party Member item called')
    useEffect(() => {
        // console.log('Party Member line: ', uid, charID, hostID)
        onValue(ref(db, 'characters/' + uid + '/' + charID), (snapshot) => {
            if (snapshot.exists()) {
                // console.log('snapshot exists for: ', charID)
                setCharName(snapshot.val().charName);
                setClassCode(snapshot.val().classCode);
                setQuestCount(snapshot.val().questCount);

            }
            // else {
            //     off(ref(db, 'characters/' + uid + '/' + charID))
            // }
        })

        return () => {
            off(ref(db, 'characters/' + uid + '/' + charID))
        }

    }, [charID])

    return (

        <div>
            {'Joined by ' + charName + ' the ' +
                charClassTitles[classCode] + charTitles[questCount]
            }
            {hostID === uid && ' (host)'}
        </div>
    )
}

export default PartyMember