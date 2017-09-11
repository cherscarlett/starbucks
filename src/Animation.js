import React, { Component } from 'react'
import Sprite from './images/background-animation.png'

class Animation extends Component {
    render() {
        return (
            <div>
                <canvas id="App-animation" aria-hidden="true">
                </canvas>
            </div>
        )
    }
    componentDidMount () {
        const animation = new Image()
        animation.src = Sprite

        let tickCount = 0
        let frameIndex = 0

        const sprite = (options) => {

            const ticksPerFrame = options.ticksPerFrame || 0
            const numberOfFrames = options.numberOfFrames || 1

            return {
                context: options.context,
                width: options.width,
                height: options.height,
                image: options.image,
                loop: options.loop,
                render: () => {
                    options.context.drawImage(
                        options.image,
                        frameIndex * options.width/numberOfFrames,
                        0,
                        options.width/numberOfFrames,
                        options.height,
                        0,
                        0,
                        options.width/numberOfFrames,
                        options.height
                    )
                },
                update: () => {
                    tickCount += 1
                    if (tickCount > ticksPerFrame) {
                        tickCount = 0
                        if (frameIndex < numberOfFrames - 1) {
                            frameIndex += 1
                        } else if (options.loop) {
                            frameIndex = 0
                        }
                    }
                }
            }
        }

        const canvas = document.getElementById('App-animation')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const background = sprite({
            context: canvas.getContext("2d"),
            width: canvas.width,
            height: canvas.height/(600/338),
            image: animation
        })

        const theLoop = () => {
              window.requestAnimationFrame(theLoop)

              background.update()
              background.render()
        }

        animation.addEventListener("load", theLoop)

    }
}

export default Animation
