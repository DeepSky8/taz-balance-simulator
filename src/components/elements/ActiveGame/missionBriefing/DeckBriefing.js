import React, { useState } from "react";

const DeckBriefing = ({ flavor, p1, a1, u1, p2, a2, u2 }) => {
    const [prompt1, setPrompt1] = useState('')
    const [focused1, setFocused1] = useState(false)
    const textSwitcher1 = () => { setFocused1(!focused1) }
    const [prompt2, setPrompt2] = useState('')
    const [focused2, setFocused2] = useState(false)
    const textSwitcher2 = () => { setFocused2(!focused1) }

    return (
        <div>
            <div>{flavor}</div>
            <div>
                <form>
                    <p><label htmlFor="StoryPrompt1">{p1}</label></p>
                    <input
                        id='StoryPrompt1'
                        name='StoryPrompt1'
                        value={focused1 ? prompt1 : a1}
                        placeholder='Click out of box to save'
                        type='text'
                        onChange={(e) => { setPrompt1(e.target.value) }}
                        onBlur={() => { textSwitcher1(); u1(prompt1); }}
                        onFocus={() => { textSwitcher1() }}
                    />

                </form>
            </div>
            <div>
                <form>
                    <p><label htmlFor="StoryPrompt2">{p2}</label></p>
                    <textarea
                        id="StoryPrompt2"
                        name="StoryPrompt2"
                        rows='4'
                        cols='30'
                        placeholder="Click out of box to save"
                        value={focused2 ? prompt2 : a2}
                        onChange={(e) => { setPrompt2(e.target.value) }}
                        onBlur={() => { textSwitcher2(); u2(prompt2); }}
                        onFocus={() => { textSwitcher2() }}
                    />

                </form>
            </div>
        </div>
    )
}

export default DeckBriefing

// <textarea
// id="StoryPrompt1"
// name="StoryPrompt2"
// rows='4'
// cols='30'
// placeholder="Text will be saved when you click out of this box"
// value={a2}
// onChange={(e) => { u2(e) }}
// />

// onChange={(e) => { u1(e) }}