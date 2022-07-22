import React, { useEffect, useState } from "react";

const DeckBriefing = ({ intro, flavor, p1, a1, u1, p2, a2, u2 }) => {
    const [prompt1, setPrompt1] = useState('')
    const [prompt2, setPrompt2] = useState('')


    useEffect(() => {
        setPrompt1(a1)
        setPrompt2(a2)
    }, [a1, a2])

    return (
        <div>
            <div>{intro}</div>
            <div>{flavor}</div>
            <div>
                <form>
                    <p><label htmlFor="StoryPrompt1">{p1}</label></p>
                    <input
                        id='StoryPrompt1'
                        name='StoryPrompt1'
                        value={prompt1}
                        placeholder='Click out of box to save'
                        type='text'
                        onChange={(e) => { e.preventDefault(); setPrompt1(e.target.value) }}
                        onBlur={() => { u1(prompt1); }}
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
                        value={prompt2}
                        onChange={(e) => { setPrompt2(e.target.value) }}
                        onBlur={() => { u2(prompt2); }}
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