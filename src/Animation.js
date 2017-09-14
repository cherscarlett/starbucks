import React, { Component } from 'react'
import './Animation.css'

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item) })
  return images;
}

const Scenes = importAll(require.context('./images/frames', false, /\.(png)$/))

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
                }, 150)
            }
        }

        const loaded = (i) => {
            loadedNumber++
            if (Object.values(Scenes).length - 1 === loadedNumber) {
                setTimeout(() => {
                    text.style.opacity = 0
                    theLoop(animations[0], 0)
                }, 10000)
            }
        }

        Object.values(Scenes).forEach((path, i) => {
            const scene = new Image()
            scene.src = path
            scene.addEventListener("load", loaded(i))
            animations.push(scene)
        })
    }
}

export default Animation
