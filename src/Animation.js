import React, { Component } from 'react'
import Track from './audio/mocha-drip.mp3'
import './Animation.css'

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item) })
  return images;
}

const Frames = importAll(require.context('./images/frames', false, /\.(png)$/))

class Animation extends Component {
    render() {
        return (
            <div id="App-animation">
                <article id="Animation-text">
                </article>
            </div>
        )
    }
    componentDidMount () {
        const canvas = document.getElementById('App-animation')
        const text = document.getElementById('Animation-text')
        const animations = []
        const audio = new Audio()

        audio.src = Track
        audio.volume = '0.3'
        audio.autoplay = true

        let loadedNumber = 0
        requestAnimationFrame(()=> {
            canvas.style.opacity = 1
            requestAnimationFrame(() => {
                document.querySelector('.Hero.open g#status_bar').style.opacity = 0
                document.querySelector('.Hero.open g#Apps').style.opacity = 0
                document.querySelector('.Hero.open rect#Blur_Bar').style.opacity = 0
                document.querySelector('.Hero.open rect#white_overlay').style.opacity = 0
            })
        })

        const theLoop = (animation, i) => {
            canvas.appendChild(animation)
            if (i === 1) {
                requestAnimationFrame(() => {
                    animation.style.opacity = 1
                })
            }
            if (i !== animations.length - 1) {
                setTimeout(() => {
                    theLoop(animations[i+1], i+1)
                    animation.parentNode.removeChild(animation)
                }, 100)
            } else {
                setTimeout(() => {
                    animation.style.opacity = 0
                    text.classList.add('end')
                    requestAnimationFrame(() => {
                        text.style.opacity = 1
                        animation.parentNode.removeChild(animation)
                    })
                }, 10000)
            }
        }

        const loaded = (i) => {
            loadedNumber++
            if (Object.values(Frames).length - 1 === loadedNumber) {
                setTimeout(() => {
                    canvas.appendChild(audio)
                    text.style.opacity = 0
                    theLoop(animations[0], 0)
                }, 10000)
            }
        }

        Object.values(Frames).forEach((path, i) => {
            const frame = new Image()
            frame.src = path
            frame.addEventListener("load", loaded(i))
            animations.push(frame)
        })
    }
}

export default Animation
