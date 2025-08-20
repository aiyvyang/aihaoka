<template>
  <!-- 氛围组：烟花 https://github.com/Doener48/firework -->
  <div
    class="message"
    v-if="theme?.website?.showFirework"
    :style="{
      top: windowHeight - 144 + 'px'
    }"
  >
    <span class="span">{{ theme?.website?.fireworkTitle }}</span>
    <div class="msgwrap">
      <div class="messageleft">
        <input id="messageInput" placeholder="输入文字" :value="newyearwords" type="text" />
      </div>

      <button id="shootBtn" class="button">发射</button>
    </div>
  </div>
  <canvas id="mainCanvas"></canvas>
  <canvas id="letterCanvas" style="display: none"></canvas>
</template>
<script lang="ts" setup>
import { onMounted, watch, ref, computed } from 'vue'
import { useData, useRouter } from 'vitepress'
import { getRandomInt } from '../functions'
const { isDark, theme } = useData()
const newyearwordslist = theme.value?.website?.fireworkWords ? theme.value.website.fireworkWords : []
const newyearwords = ref(newyearwordslist[getRandomInt(newyearwordslist.length)])

const windowHeight = ref(window.innerHeight)

const startcanvas = () => {
  interface Color {
    r: number
    g: number
    b: number
    a: number
  }
  class Vector {
    x: number
    y: number
    constructor(x: number = 0, y: number = 0) {
      this.x = x
      this.y = y
    }

    add(s: Vector) {
      this.x += s.x
      this.y += s.y
    }

    sub(s: Vector) {
      this.x -= s.x
      this.y -= s.y
    }

    scale(m: number) {
      this.x *= m
      this.y *= m
    }

    div(m: number) {
      this.x /= m
      this.y /= m
    }

    norm() {
      const m = Math.sqrt(this.x * this.x + this.y * this.y)
      this.x /= m
      this.y /= m
    }
  }

  let generalSettings = { bgAlpha: 1 }
  let rocketSettings = { size: 2, spawnRate: 1 } //控制发射时的大小、数量
  let explosionSettings = { size: 2, fadeSpeed: 4, applyGravity: false } //控制爆炸后的高斯模糊、大小、重力效果
  let wordSettings = { particleSize: 1, fadeSpeed: 0.3 }
  let canvaswidth = (window.innerWidth - (1500 - 64)) / 2 + 272 - 32

  const canvas: any = document.getElementById('mainCanvas')
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')
  // window.addEventListener("resize", init, false);

  const textCanvas: any = document.getElementById('letterCanvas')
  const textCtx: CanvasRenderingContext2D = textCanvas.getContext('2d')

  const btn: any = document.getElementById('shootBtn')
  const textInput: HTMLInputElement = document.getElementById('messageInput') as HTMLInputElement
  btn.addEventListener('click', (e: Event) => {
    newyearwords.value = newyearwordslist[getRandomInt(newyearwordslist.length)]
    fireworks.push(new Firework(textInput.value))
  })

  let bgcolor = ref({})

  const gravity = new Vector(0, 0.05)
  const fireworks: Firework[] = []

  if (isDark.value) {
    bgcolor.value = { r: 22, g: 22, b: 24, a: 1 }
  } else {
    bgcolor.value = { r: 246, g: 246, b: 246, a: 1 }
  }

  let letterImageData

  function init() {
    canvas.width = canvaswidth
    canvas.height = window.innerHeight
    ctx.fillStyle = 'transparent'
    ctx.fill()

    textCanvas.style.background = 'white'
    textCanvas.width = canvaswidth
    textCanvas.height = 150
    // fireworks.push(new Firework("2024"));
    if (isDark.value) {
      bgcolor.value = { r: 22, g: 22, b: 24, a: 1 }
      fireworks.push(new Firework())
    } else {
      bgcolor.value = { r: 246, g: 246, b: 246, a: 1 }
      fireworks.push(new Firework())
    }
  }

  function generateTextParticles(text: string, offset: Vector, color: Color) {
    textCtx.fillStyle = 'black'
    textCtx.font = '12px Verdana'
    textCtx.clearRect(0, 0, canvaswidth, 150)
    textCtx.fillText(text, 0, 30)
    letterImageData = textCtx.getImageData(0, 0, canvaswidth, 100)
    const letterParticles = []
    for (let y = 0, y2 = letterImageData.height; y < y2; y++) {
      for (let x = 0, x2 = letterImageData.width; x < x2; x++) {
        if (letterImageData.data[y * 4 * letterImageData.width + x * 4 + 3] > 128) {
          const ptemp = new Particle(
            new Vector(),
            new Vector(),
            new Vector(),
            wordSettings.particleSize,
            color,
            new Vector(x * 3 + offset.x - text.length * 18, y * 3 + offset.y - 100)
          )
          ptemp.pos = new Vector(offset.x, offset.y)
          letterParticles.push(ptemp)
        }
      }
    }
    return letterParticles
  }

  function animate() {
    requestAnimationFrame(animate)
    ctx.rect(0, 0, canvaswidth, window.innerHeight)
    // @ts-expect-error：缺少类型声明
    ctx.fillStyle = `rgba(${bgcolor.value?.r},${bgcolor.value?.g},${bgcolor.value?.b},1)`
    ctx.fill()
    if (Math.random() <= rocketSettings.spawnRate / 100) {
      fireworks.push(new Firework())
    }
    for (let i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update()
      fireworks[i].draw()
      if (fireworks[i].exploded && fireworks[i].particles.length == 0) {
        fireworks.splice(i, 1)
      }
    }
  }
  class Particle {
    pos: Vector
    vel: Vector
    acc: Vector
    size: number
    color: Color
    homePos: Vector

    constructor(
      pos: Vector = new Vector(canvaswidth / 2 + ((Math.random() - 0.5) * canvaswidth) / 6, window.innerHeight),
      vel: Vector = new Vector((Math.random() - 0.5) * 1, Math.random() * -2 - 6),
      acc: Vector = new Vector(),
      size: number = rocketSettings.size,
      color = {
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255,
        a: 1
      },
      homePos: Vector = pos
    ) {
      this.pos = pos
      this.vel = vel
      this.acc = acc
      this.size = size
      this.color = color
      this.homePos = homePos

      this.draw()
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2, false)
      ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})`
      ctx.fill()
    }

    update() {
      this.vel.add(this.acc)
      this.pos.add(this.vel)
      this.acc.scale(0)
    }

    fade(x: number) {
      if (this.color.a > 0) {
        this.color.a -= 0.0001 * x
      }
    }

    applyForce(force: Vector) {
      this.acc.add(force)
    }

    steerToHome() {
      const dvec = new Vector(this.homePos.x - this.pos.x, this.homePos.y - this.pos.y)
      const distanceFromHome = Math.sqrt(dvec.x * dvec.x + dvec.y * dvec.y)
      if (distanceFromHome > 0) {
        dvec.norm()
        dvec.scale(Math.random() * 4)
        this.vel = dvec
      }
    }
  }

  class Firework {
    rocket: Particle
    particles: Particle[]
    exploded: boolean
    text: string

    constructor(text?: string) {
      this.particles = []
      this.exploded = false
      this.rocket = new Particle()
      this.text = text
    }

    update() {
      if (!this.exploded) {
        this.rocket.applyForce(gravity)
        this.rocket.update()
        if (this.rocket.vel.y > 0) {
          this.explode()
        }
      } else {
        for (let i = this.particles.length - 1; i >= 0; i--) {
          let fader = explosionSettings.fadeSpeed
          if (this.text) {
            fader = ((1 - this.text.length / 50) / 2) * wordSettings.fadeSpeed
            this.particles[i].steerToHome()
          }
          if (explosionSettings.applyGravity) {
            this.particles[i].applyForce(gravity)
          }
          this.particles[i].update()
          this.particles[i].fade(fader)
          if (this.particles[i].color.a <= 0) {
            this.particles.splice(i, 1)
          }
        }
      }
    }

    draw() {
      if (!this.exploded) {
        this.rocket.draw()
      } else {
        for (let i = 0; i < this.particles.length; i++) {
          this.particles[i].draw()
        }
      }
    }

    explode() {
      this.exploded = true

      if (this.text) {
        const letter = generateTextParticles(
          this.text,
          new Vector(this.rocket.pos.x, this.rocket.pos.y),
          this.rocket.color
        )
        this.particles = letter
      } else {
        for (let i = 0; i < 50; i++) {
          const vx = (Math.random() - 0.5) * 7
          const vy = (Math.random() - 0.5) * 7
          this.particles.push(
            new Particle(
              new Vector(this.rocket.pos.x, this.rocket.pos.y),
              new Vector(vx, vy),
              new Vector(),
              explosionSettings.size,
              this.rocket.color
            )
          )
        }
      }
    }
  }
  init()
  animate()
}

watch(isDark, (val) => {
  startcanvas()
})
onMounted(() => {
  if (theme.value?.website?.showFirework) {
    startcanvas()
  }
})
</script>
<style scoped>
#mainCanvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.message {
  position: sticky;
  z-index: 100;
  bottom: 0;
  margin-top: 40px;
  margin-bottom: -40px;
  width: 100%;
  height: 40px;

  /* margin-bottom: 2rem; */

  .span {
    position: absolute;
    bottom: 100%;
    font-size: 12px;
    opacity: 0.8;

    .a {
      color: var(--vp-c-brand);
    }
  }
}

.msgwrap {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.messageleft {
  position: relative;
  overflow: hidden;
  background-color: var(--vp-c-bg-elv);
  border-radius: 0.25rem;

  .voicectl {
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    opacity: 0.4;
    transition: 0.3s;

    .svg {
      width: 14px;
      height: 14px;
    }
  }
  .voicectl:hover {
    opacity: 1;
  }
}

#messageInput {
  background-color: var(--vp-c-bg-elv);
  padding: 0.5rem;
}

.button {
  background-color: var(--vp-c-bg-elv);
  padding: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px #00000004;
  animation: jump 0s;
  color: var(--vp-c-brand);
  margin-left: 8px;
  flex-shrink: 0;
  width: 43px;
}

.button:hover {
  animation-duration: 1s;
}

.button:active {
  animation: none;
}

@keyframes jump {
  from {
    transform: scale3d(1, 1, 1);
  }

  10%,
  20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}
</style>
