  import React from 'react'
  import { contactPageStyles as styles } from '../../../assets/dummyStyles'

  const BackGroundPartern = () => {
    return (
      <div>
        <div className={styles.diamondPattern}>
          <div className="w-full h-full" style={{
            backgroundImage: `
                    linear-gradient(30deg, rgba(249,115,22,0.08) 12%, transparent 12.5%, transparent 87%, rgba(249,115,22,0.08) 87.5%, rgba(249,115,22,0.08)),
                    linear-gradient(150deg, rgba(249,115,22,0.08) 12%, transparent 12.5%, transparent 87%, rgba(249,115,22,0.08) 87.5%, rgba(249,115,22,0.08)),
                    linear-gradient(30deg, rgba(249,115,22,0.08) 12%, transparent 12.5%, transparent 87%, rgba(249,115,22,0.08) 87.5%, rgba(249,115,22,0.08)),
                    linear-gradient(150deg, rgba(249,115,22,0.08) 12%, transparent 12.5%, transparent 87%, rgba(249,115,22,0.08) 87.5%, rgba(249,115,22,0.08)),
                    linear-gradient(60deg, rgba(234,88,12,0.08) 25%, transparent 25.5%, transparent 75%, rgba(234,88,12,0.08) 75%, rgba(234,88,12,0.08)),
                    linear-gradient(60deg, rgba(234,88,12,0.08) 25%, transparent 25.5%, transparent 75%, rgba(234,88,12,0.08) 75%, rgba(234,88,12,0.08))`,
            backgroundSize: '80px 140px',
            backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px'
          }}></div>
        </div>

        <div className={styles.floatingTriangles}>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={styles.triangle}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                background: i % 3 === 0 ? '#f97316' : i % 3 === 1 ? '#fb923c' : '#fdba74',
                transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.5})`
              }}
            ></div>
          ))}
        </div>
      </div>
    )
  }

  export default BackGroundPartern
