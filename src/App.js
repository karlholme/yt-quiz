import React, { useState } from 'react';
import questions from './questions';
import YouTubePlayer from 'react-youtube';

export default function App() {
    const [state, setState] = useState({
        currentQuestion: 0,
        selectedAnswer: '',
        showFormError: false,
        correctAnswers: 0
    });

    if (state.currentQuestion >= questions.length) {
        return (
            <div className='content'>
                <h1>Slut!</h1>
                <h2>Det gick sådär...</h2>
                <h2>Du fick {state.correctAnswers} / {questions.length}</h2>
            </div>
        )
    }

    const question = questions[state.currentQuestion];
    return (
        <div className='content'>
            <h1>Youtube Quiz™</h1>
            <form onSubmit={function (e) {
                e.preventDefault();
                if (state.selectedAnswer) {
                    setState({
                        ...state,
                        ...{
                            currentQuestion: (state.currentQuestion + 1),
                            showFormError: false,
                            selectedAnswer: '',
                            correctAnswers: (state.selectedAnswer === question.answers[question.correctAnswer]) ? state.correctAnswers + 1 : state.correctAnswers
                        }
                    })
                } else {
                    setState({
                        ...state, ...{
                            showFormError: true
                        }
                    })
                }
            }}>
                <h2>{question.question}</h2>
                <div className='video-player-wrapper'>
                    <div className={question.dontShowVideo && 'blur'} >
                        {<div className='video-title-overlay' />}
                        <YouTubePlayer
                            videoId={question.videoId}
                            onStateChange={function (e) {
                                console.log(e);
                            }}
                            opts={{
                                playerVars: {
                                    start: question.startTime || 0,
                                    end: question.endTime || 20,
                                    autoplay: 1,
                                    frameborder: 0,
                                    controls: 0,
                                    showinfo: 0,
                                    fs: 0,
                                    iv_load_policy: 3,
                                    rel: 0
                                }
                            }}
                        />
                    </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    {Object.values(question.answers).map(function (answer) {
                        return (
                            <div key={answer}>
                                <label>
                                    <input

                                        type="radio"
                                        name="radio"
                                        value={answer}
                                        checked={state.selectedAnswer === answer}
                                        onChange={function (e) {
                                            setState({
                                                ...state,
                                                ...{
                                                    selectedAnswer: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                    <span>{answer}</span>
                                </label>
                            </div>
                        )
                    })}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {state.showFormError && <span>Välj ett svar dumbom!</span>}
                    <button type="submit">Svara!</button>
                </div>
            </form>
        </div>
    )
}
