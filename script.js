class SpiritPhone {
  constructor() {
    this.currentScreen = "home"
    this.init()
  }

  init() {
    this.bindEvents()
    this.initPrivacySwitches()
    this.updateTime()
    setInterval(() => this.updateTime(), 1000)
  }

  bindEvents() {
    // App icon clicks
    document.querySelectorAll(".app-icon").forEach((icon) => {
      icon.addEventListener("click", (e) => {
        const targetScreen = e.currentTarget.dataset.screen
        this.navigateToScreen(targetScreen)
      })
    })

    // Back button clicks
    document.querySelectorAll(".back-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const targetScreen = e.currentTarget.dataset.target
        this.navigateToScreen(targetScreen)
      })
    })

    // Privacy switch toggles
    document.querySelectorAll(".switch-toggle").forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.currentTarget.classList.toggle("active")
        this.handlePrivacySwitch(e.currentTarget.dataset.switch)
      })
    })

    // Phone frame hover effect
    const phoneFrame = document.querySelector(".phone-frame")
    phoneFrame.addEventListener("mouseenter", () => {
      phoneFrame.style.transform = "rotateY(0deg) rotateX(0deg) scale(1.02)"
    })

    phoneFrame.addEventListener("mouseleave", () => {
      phoneFrame.style.transform = "rotateY(-5deg) rotateX(5deg) scale(1)"
    })
  }

  navigateToScreen(screenId) {
    // Hide current screen
    const currentScreenEl = document.querySelector(".screen.active")
    if (currentScreenEl) {
      currentScreenEl.classList.remove("active")
    }

    // Show target screen
    const targetScreenEl = document.getElementById(screenId)
    if (targetScreenEl) {
      setTimeout(() => {
        targetScreenEl.classList.add("active")
      }, 150)
    }

    this.currentScreen = screenId
    this.addScreenTransitionEffect()
  }

  addScreenTransitionEffect() {
    const phoneScreen = document.querySelector(".phone-screen")
    phoneScreen.style.transform = "scale(0.98)"

    setTimeout(() => {
      phoneScreen.style.transform = "scale(1)"
    }, 150)
  }

  initPrivacySwitches() {
    // Randomly set some switches to active for demo
    const switches = document.querySelectorAll(".switch-toggle")
    switches.forEach((toggle, index) => {
      if (Math.random() > 0.5) {
        toggle.classList.add("active")
      }
    })
  }

  handlePrivacySwitch(switchType) {
    // Add visual feedback
    const statusBar = document.querySelector(".status-bar")
    const notification = document.createElement("div")
    notification.style.cssText = `
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 12px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `

    const switchNames = {
      mic: "Microphone",
      camera: "Camera",
      gps: "GPS/Location",
      cellular: "Cellular Radio",
    }

    const isActive = document.querySelector(`[data-switch="${switchType}"]`).classList.contains("active")
    notification.textContent = `${switchNames[switchType]} ${isActive ? "Enabled" : "Disabled"}`

    statusBar.appendChild(notification)

    setTimeout(() => {
      notification.style.opacity = "1"
    }, 10)

    setTimeout(() => {
      notification.style.opacity = "0"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 300)
    }, 2000)
  }

  updateTime() {
    const now = new Date()
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    })

    const timeElement = document.querySelector(".time")
    if (timeElement) {
      timeElement.textContent = timeString
    }
  }

  // Add some interactive animations
  addInteractiveEffects() {
    // Add ripple effect to app icons
    document.querySelectorAll(".app-icon").forEach((icon) => {
      icon.addEventListener("click", (e) => {
        const ripple = document.createElement("div")
        const rect = icon.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2

        ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `

        icon.style.position = "relative"
        icon.style.overflow = "hidden"
        icon.appendChild(ripple)

        setTimeout(() => {
          if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple)
          }
        }, 600)
      })
    })
  }
}

// Add CSS animation for ripple effect
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .phone-frame {
        transition: transform 0.3s ease;
    }
    
    .phone-screen {
        transition: transform 0.15s ease;
    }
`
document.head.appendChild(style)

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const spiritPhone = new SpiritPhone()
  spiritPhone.addInteractiveEffects()
})

// Add some Easter eggs
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    const phoneFrame = document.querySelector(".phone-frame")
    phoneFrame.style.transform = "rotateY(360deg) rotateX(360deg)"
    setTimeout(() => {
      phoneFrame.style.transform = "rotateY(-5deg) rotateX(5deg)"
    }, 1000)
  }
})
